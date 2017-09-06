using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hohotel.Tests.Helper
{
    public static class TestControllerContext
    {
        public static ControllerContext Create(string userName)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, userName)
            }));
            return new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };
        }
    }
}
