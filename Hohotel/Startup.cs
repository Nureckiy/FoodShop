using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;
using AutoMapper;
using Hohotel.Auth;
using Hohotel.Middlewares;
using Hohotel.Models;
using Hohotel.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Hohotel
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var domain = $"https://{Configuration["auth0:domain"]}/";
            services.Configure<AppConfiguration>(Configuration.GetSection("AppVariables"));

            // Add framework services.
            services.AddDbContext<HohotelContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("HohotelContext")));
            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.Converters =
                        new List<JsonConverter> { new StringEnumConverter {CamelCaseText = true} };
                });
            services.AddAutoMapper();
            services.AddCors(options => options.AddPolicy("AllowAll", p =>
            {
                p.AllowAnyOrigin();
                p.AllowAnyMethod();
                p.AllowAnyHeader();
            }));
            services.AddAuthorization(options =>
            {
                options.AddPolicy("change:bookingStatus",
                    policy => policy.Requirements.Add(new PermissionRequirement("change:bookingStatus", domain)));
                options.AddPolicy("change:orderStatus",
                    policy => policy.Requirements.Add(new PermissionRequirement("change:orderStatus", domain)));
            });

            // Add application services.
            services.AddTransient<IRoomService, RoomService>();
            services.AddTransient<IRoomCategoryService, RoomCategoryService>();
            services.AddTransient<IDishService, DishService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<IMailService, EmailService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            var options = new JwtBearerOptions
            {
                Audience = Configuration["auth0:clientId"],
                Authority = $"https://{Configuration["auth0:domain"]}/",
                TokenValidationParameters =
                {
                    NameClaimType = "name"
                }
            };
            app.UseJwtBearerAuthentication(options);
            app.UseExceptionMiddleware();
            app.UseCors("AllowAll");
            app.UseMvc();
        }
    }
}
