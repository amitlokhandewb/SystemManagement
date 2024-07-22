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
        }
        [HttpPost("CreateEventDescriptionAsync")]

        public async Task<ActionResult<EventDescription>> CreateEventDescriptionAsync(EventDescription eventDescription)
        {
            var response = await _eventDescriptionService.CreateEventDescriptionAsync(eventDescription);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPut("UpdateEventDescriptionAsync/{id}")]
        public async Task<ActionResult<EventDescription>> UpdateEventDescriptionAsync(EventDescription eventDescription, int id)
        {
            var response = await _eventDescriptionService.UpdateEventDescriptionAsync(eventDescription, id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();

        }
        [HttpDelete("DeleteEvenetDescriptionAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteEvenetDescriptionAsync(int id)
        {
            var response = await _eventDescriptionService.DeleteEventDescriptionAsync( id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
