using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
        [HttpGet("GetUsersAsync")]
        public async Task<ActionResult<IEnumerable<ActionBy>>> GetUsersAsync()
        {
            var response = await _userService.GetUsersAsync();
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreateUserAsync")]
        public async Task<ActionResult<ActionBy>> CreateUserAsync(ActionBy actionBy)
        {
            var response = await _userService.CreateUserAsync(actionBy);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPut("UpdateUserAsync/{id}")]
        public async Task<ActionResult<ActionBy>> UpdateUserAsync(ActionBy actionBy, int id)
        {
            var response = await _userService.UpdateUserAsync(actionBy,id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpDelete("DeleteUserAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteUserAsync(int id)
        {
            var response = await _userService.DeleteUserAsync(id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
