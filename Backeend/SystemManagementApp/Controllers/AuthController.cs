using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;
using System.Collections.Generic;
using System.Threading.Tasks;
using SystemManagementApp.DTOs;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly EndUserService _endUserService;
        private readonly BrancaService _brancaService;

        public AuthController(EndUserService endUserService, BrancaService brancaService)
        {
            _endUserService = endUserService;
            _brancaService = brancaService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<EndUser>> LoginAsync(string email, string password)
        {
            var user = await _endUserService.GetEndUserByEmailAsync(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return Unauthorized("Username or password is incorrect");
            }

            var payload = new BrancaTokenPayload
            {
                Email = email,
                IssuedAt = DateTime.UtcNow,

            };

            var token = _brancaService.CreateToken(payload);
            return Ok(new
            {
                Token = token,
                roleid = user.RoleId,
                userid = user.Id,
                fullname = user.UserName

            }) ;
    
        }
        [HttpPost("Register")]
        public async Task<ActionResult<EndUser>> CreateEndUserAsync(CreateEndUser createEndUser)
        {
            var enduserexist = await _endUserService.GetEndUserByEmailAsync(createEndUser.Email);
            if (enduserexist != null)
            {
                return NotFound("Username already exist");

            }
            var response = await _endUserService.CreateEndUserAsync(createEndUser);
            if (response == null)
            {
                return BadRequest();
            }
            return Ok("User Added Successfully");
        }
    }
}
