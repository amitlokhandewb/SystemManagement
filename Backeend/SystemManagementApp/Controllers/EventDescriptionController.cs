using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class EventDescriptionController : ControllerBase
    {
        private readonly EventDescriptionService _eventDescriptionService;

        public EventDescriptionController(EventDescriptionService eventDescriptionService)
        {
            _eventDescriptionService = eventDescriptionService;
        }
        [HttpGet("GetEventDescriptipnAsync")]
        public async Task<ActionResult<IEnumerable<EventDescription>>> GetEventDescriptipnAsync()
        {
            var response = await _eventDescriptionService.GetEventDescriptionsAsync();
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }[HttpGet("GetEventDescriptipnByIdAsync/{id}")]
        public async Task<ActionResult<IEnumerable<EventDescription>>> GetEventDescriptipnByIdAsync(int id)
        {
            var response = await _eventDescriptionService.GetEventDescriptionByIdAsync(id);
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreateEventDescriptionAsync")]

        public async Task<ActionResult<EventDescription>> CreateEventDescriptionAsync(EventDescription eventDescription)
        {
            var alreadyexist = await _eventDescriptionService.GetEventDescriptionByNameAsync(eventDescription.eventDescription);
            if(alreadyexist != null)
            {
                return BadRequest("Event Description Already Exist");
            }
            var response = await _eventDescriptionService.CreateEventDescriptionAsync(eventDescription);
            if (response != null)
            {
                return Ok("Event Description Added Successfully");
            }
            return NotFound();
        }
        [HttpPut("UpdateEventDescriptionAsync/{id}")]
        public async Task<ActionResult<EventDescription>> UpdateEventDescriptionAsync(EventDescription eventDescription, int id)
        {
            var alreadyexist = await _eventDescriptionService.GetEventDescriptionByNameAsync(eventDescription.eventDescription);
            if (alreadyexist != null)
            {
                return BadRequest("Event Description Already Exist");
            }
            var response = await _eventDescriptionService.UpdateEventDescriptionAsync(eventDescription, id);
            if (response != null)
            {
                return Ok("Event Description Updated Successfully");
            }
            return NotFound();

        }
        [HttpDelete("DeleteEvenetDescriptionAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteEvenetDescriptionAsync(int id)
        {
            var response = await _eventDescriptionService.DeleteEventDescriptionAsync( id);
            if (response == false)
            {
                return BadRequest("Error occured while deleting the Event Description");
            }
            return Ok("Event Description Deleted Successfully");
        }
    }
}
