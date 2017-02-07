using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FoodShop.Startup))]
namespace FoodShop
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
