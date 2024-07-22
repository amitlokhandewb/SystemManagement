using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class PriorityController : ControllerBase
    {
        private readonly PriorityService _priorityService;

        public PriorityController(PriorityService priorityService)
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
        [HttpPost("CreatePriorityAsync")]
        public async Task<ActionResult<Priority>> CreatePriorityAsync(Priority priority)
        {
            var response = await _priorityService.CreatePriorityAsync(priority);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPut("UpdatePriorityAsync/{id}")]
        public async Task<ActionResult<Priority>> UpdatePriorityAsync(Priority priority, int id)
        {
            var response = await _priorityService.UpdatePriorityAsync(priority,id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpDelete("DeletePriorityAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeletePriorityAsync(int id)
        {
            var response = await _priorityService.DeletePriorityAsync(id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
