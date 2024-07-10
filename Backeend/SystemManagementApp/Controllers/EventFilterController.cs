using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventFilterController : ControllerBase
    {
        private readonly EventFilterService _eventFilterService;

        public EventFilterController(EventFilterService eventFilterService)
        {
            _eventFilterService = eventFilterService;
        }
        [HttpPost("Filter")]
        public async Task<ActionResult<IEnumerable<Events>>> Filter(FilterDto filterDto)
        {
            var filter = await _eventFilterService.GetFilterData(filterDto);
            if(filter == null)
            {
                return NotFound();
            }
            return Ok(filter);
        }
    }
}
