using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.DTOs;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EndUserController : ControllerBase
    {
        private readonly EndUserService _endUserService;

        public EndUserController(EndUserService endUserService)
        {
            _endUserService = endUserService;
        }
        [HttpGet("GetEndUsersAsync")]
        public async Task<ActionResult<IEnumerable<EndUser>>> GetEndUsersAsync()
        {
            var response = await _endUserService.GetEndUsersAsync();
            if(response == null)
            {
                return BadRequest();
            }
            return Ok(response);
        } 
        [HttpGet("GetEndUserByIdAsync/{id}")]
        public async Task<ActionResult<IEnumerable<EndUser>>> GetEndUserByIdAsync(int id)
        {
            var response = await _endUserService.GetEndUserByIdAsync(id);
            if(response == null)
            {
                return BadRequest();
            }
            return Ok(response);
        }
        [HttpPost("CreateEndUserAsync")]
        public async Task<ActionResult<EndUser>> CreateEndUserAsync(CreateEndUser createEndUser)
        {
            var response = await _endUserService.CreateEndUserAsync(createEndUser);
            if (response == null)
            {
                return BadRequest();
            }
            return Ok("User Added Successfully"+ response);
        }
        [HttpPut("UpdateEndUserAsync/{id}")]
        public async Task<ActionResult<EndUser>> UpdateEndUserAsync(CreateEndUser createEndUser, int id)
        {
            var response = await _endUserService.UpdateEndUserAsync(createEndUser,id);
            if (response == null)
            {
                return BadRequest();
            }
            return Ok("User Updated Successfully" + response);
        }
        [HttpDelete("DeleteEndUserAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteEndUserAsync(int id)
        {
            var response = await _endUserService.DeleteEndUserAsync(id);
            if (response == false)
            {
                return BadRequest("Error occured while deleting the end user");
            }
            return Ok("User Deleted Successfully");
        }
    }
}
