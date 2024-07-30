using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class EventFilterController : ControllerBase
    {
        private readonly EventFilterService _eventFilterService;

        public EventFilterController(EventFilterService eventFilterService)
        {
            _eventFilterService = eventFilterService;
        }
        [HttpPost("Filter/{page}/{pageLimit}")]
        public async Task<ActionResult<IEnumerable<Events>>> Filter(FilterDto filterDto,int page, int pageLimit)
        {
            var filter = await _eventFilterService.GetFilterDataBySP(filterDto, page, pageLimit);
            if(filter == null)
            {
                return NotFound();
            }
            return Ok(filter);
        }
    }
}
