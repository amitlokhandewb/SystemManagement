using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class EventTypeController : ControllerBase
    {
        private readonly EventTypeService _eventTypeService;

        public EventTypeController(EventTypeService eventTypeService)
        {
            _eventTypeService = eventTypeService;
        }
        [HttpGet("GetEventTypeAsync")]
        public async Task<ActionResult<IEnumerable<EventType>>> GetEventTypeAsync()
        {
            var response = await _eventTypeService.GetEventTypesAsync();
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreateEventTypeAsync")]
        public async Task<ActionResult<EventType>> CreateEventTypeAsync(EventType eventType)
        {
            var response = await _eventTypeService.CreateEventTypeAsync(eventType);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPut("UpdateEventTypeAsync/{id}")]
        public async Task<ActionResult<EventType>> UpdateEventTypeAsync(EventType eventType, int id)
        {
            var response = await _eventTypeService.UpdateEventTypeAsync(eventType, id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpDelete("DeleteEventTypeAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteEventTypeAsync(int id)
        {
            var response = await _eventTypeService.DeleteEventTypeAsync(id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
