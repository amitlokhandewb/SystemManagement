using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventService _eventService;

        public EventsController(EventService eventService)
        {
            _eventService = eventService;
        }
        [HttpGet("GetAllEvents")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsAsync(int page, int pageLimit)
        {
            var eventList = await _eventService.GetEventsAsync(page, pageLimit);
            if(eventList == null)
            {
                return NotFound();
            }
            return Ok(eventList);
        }
        [HttpGet("GetEventsById/{id}")]
        public async Task<ActionResult<Events>> GetEventsAsync(int id)
        {
            var eventExist = await _eventService.GetEventsById(id);
            if(eventExist == null)
            {
                return NotFound();
            }
            return Ok(eventExist);
        }
        [HttpPost("CreateEvents")]
        public async Task<ActionResult<Events>> CreateEventAsync(Events events)
        {
            var createevent = await _eventService.CreateEvents(events);
            if(createevent == null)
            {
                return BadRequest();
            }
            return Ok(createevent);
        }
        [HttpDelete("DeleteEvents/{id}")]
        public async Task<ActionResult<Events>> DeleteEventAsync(int id)
        {
            var eventExist = await _eventService.DeleteEvents(id);
            if (eventExist == null)
            {
                return NotFound();
            }
            return Ok(eventExist);
        }
        [HttpGet("CreateRandomEventAsync")]
        public async Task<ActionResult<Events>> CreateRandomEventAsync()
        {
            var createevent = await _eventService.CreateRandomEventAsync();
            if (createevent == null)
            {
                return BadRequest();
            }
            return Ok(createevent);
        }
    }
}
