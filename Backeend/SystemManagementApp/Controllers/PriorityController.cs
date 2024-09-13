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
    public class PriorityController : ControllerBase
    {
        private readonly IPriorityService _priorityService;

        public PriorityController(IPriorityService priorityService)
        {
            _priorityService = priorityService;
        }
        [HttpGet("GetPrioritiesAsync")]
        public async Task<ActionResult<IEnumerable<Priority>>> GetPrioritiesAsync()
        {
            var response = await _priorityService.GetPrioritiesAsync();
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpGet("GetPriorityByIdAsync/{id}")]
        public async Task<ActionResult<IEnumerable<Priority>>> GetPriorityByIdAsync(int id)
        {
            var response = await _priorityService.GetPriorityByIdAsync(id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreatePriorityAsync")]
        public async Task<ActionResult<Priority>> CreatePriorityAsync(Priority priority)
        {
            var alreadyexist = await _priorityService.GetPriorityByNameAsync(priority.priorityName);
            if (alreadyexist != null)
            {
                return BadRequest("Priority Already Exist");
            }
            var response = await _priorityService.CreatePriorityAsync(priority);
            if (response != null)
            {
                return Ok("Priority Added Successfully");
            }
            return NotFound();
        }
        [HttpPut("UpdatePriorityAsync/{id}")]
        public async Task<ActionResult<Priority>> UpdatePriorityAsync(Priority priority, int id)
        {
            var alreadyexist = await _priorityService.GetPriorityByNameAsync(priority.priorityName);
            if (alreadyexist != null)
            {
                return BadRequest("Priority Already Exist");
            }
            var response = await _priorityService.UpdatePriorityAsync(priority,id);
            if (response != null)
            {
                return Ok("Priority Updated Successfully");
            }
            return NotFound();
        }
        [HttpDelete("DeletePriorityAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeletePriorityAsync(int id)
        {
            var response = await _priorityService.DeletePriorityAsync(id);
            if (response == false)
            {
                return BadRequest("Error occured while deleting the Priority");
            }
            return Ok("Priority Deleted Successfully");
        }
    }
}
