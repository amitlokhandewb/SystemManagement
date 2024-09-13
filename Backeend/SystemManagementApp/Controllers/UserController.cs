using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
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
        [HttpGet("GetUsersByIdAsync/{id}")]
        public async Task<ActionResult<IEnumerable<ActionBy>>> GetUsersByIdAsync(int id)
        {
            var response = await _userService.GetUsersByIdAsync(id);
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreateUserAsync")]
        public async Task<ActionResult<ActionBy>> CreateUserAsync(ActionBy actionBy)
        {
            var alreadyexist = await _userService.GetUsersByNameAsync(actionBy.actionName);
            if(alreadyexist != null)
            {
                return BadRequest("User Already Exist");
            }
            var response = await _userService.CreateUserAsync(actionBy);
            if (response != null)
            {
                return Ok("User Added Successfully");
            }
            return NotFound();
        }
        [HttpPut("UpdateUserAsync/{id}")]
        public async Task<ActionResult<ActionBy>> UpdateUserAsync(ActionBy actionBy, int id)
        {
            var alreadyexist = await _userService.GetUsersByNameAsync(actionBy.actionName);
            if (alreadyexist != null)
            {
                return BadRequest("User Already Exist");
            }
            var response = await _userService.UpdateUserAsync(actionBy,id);
            if (response != null)
            {
                return Ok("User Updated Successfully");
            }
            return NotFound();
        }
        [HttpDelete("DeleteUserAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteUserAsync(int id)
        {
            var response = await _userService.DeleteUserAsync(id);
            if (response == false)
            {
                return BadRequest("Error occured while deleting the end user");
            }
            return Ok("User Deleted Successfully");
        }
    }
}
