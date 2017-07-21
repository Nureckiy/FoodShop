using AutoMapper;
using Hohotel.Models;
using Hohotel.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

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
            // Add framework services.
            services.AddDbContext<HohotelContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("HohotelContext")));
            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
            services.AddAutoMapper();
            services.AddCors(options => options.AddPolicy("AllowAll", p =>
            {
                p.AllowAnyOrigin();
                p.AllowAnyMethod();
                p.AllowAnyHeader();
            }));

            // Add application services.
            services.AddTransient<IRoomService, RoomService>();
            services.AddTransient<IRoomCategoryService, RoomCategoryService>();
            services.AddTransient<IDishService, DishService>();
            services.AddTransient<IOrderService, OrderService>();
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
                TokenValidationParameters
                {
                    NameClaimType = "name"
                }
            };
            app.UseJwtBearerAuthentication(options);

            app.UseCors("AllowAll");
            app.UseMvc();
        }
    }
}
