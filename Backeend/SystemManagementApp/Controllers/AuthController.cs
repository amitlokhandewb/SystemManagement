using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;
using Paseto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly PasetoSettings _pasetoSettings;
        private readonly EndUserService _endUserService;

        public AuthController(PasetoSettings pasetoSettings, EndUserService endUserService)
        {
            _pasetoSettings = pasetoSettings;
            _endUserService = endUserService;
        }

        public async Task<ActionResult<EndUser>> LoginAsync(string username, string password)
        {
            var user = await _endUserService.GetEndUserByUserNameAsync(username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return Unauthorized("Username or password is incorrect");
            }
            return Ok(user);
            //var token = new PasetoBuilder()
            //    .UseV2()
            //    .WithKey(_pasetoSettings.SymmetricKey)
            //    .Subject(username)
            //    .Expiration(DateTime.UtcNow.AddMinutes(_pasetoSettings.TokenExpirationMinutes))
            //    .Issuer("PasetoAuthDemo")
            //    .Audience("PasetoAuthDemo")
            //    .Build();

            //return Ok(new { Token = token });
        }
    }
}
