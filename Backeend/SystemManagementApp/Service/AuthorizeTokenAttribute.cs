using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

public class AuthorizeTokenAttribute : Attribute, IAuthorizationFilter
{
    private readonly BrancaService _brancaService;

    public AuthorizeTokenAttribute(BrancaService brancaService)
    {
        _brancaService = brancaService;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        try
        {
            var payload = _brancaService.ValidateToken(token);
            if (payload.ExpiresAt < DateTime.UtcNow)
            {
                context.Result = new UnauthorizedResult();
            }
        }
        catch (Exception)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}
