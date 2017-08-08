using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Hohotel.Auth
{
    public class PermissionRequirement : AuthorizationHandler<PermissionRequirement>, IAuthorizationRequirement
    {
        private readonly string issuer;
        private readonly string permission;

        public PermissionRequirement(string permission, string issuer)
        {
            this.permission = permission;
            this.issuer = issuer;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            // If user does not have the permission claim, get out of here
            if (!context.User.HasClaim(c => c.Type == "permissions" && c.Issuer == issuer))
                return Task.CompletedTask;

            // Split the scopes string into an array
            var scopes = context.User.FindFirst(c => c.Type == "permissions" && c.Issuer == issuer).Value.Split(' ');

            // Succeed if the permission array contains the required permission
            if (scopes.Any(s => s == permission))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
