using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class EventFilterController : ControllerBase
    {
        private readonly IEventFilterService _eventFilterService;

        public EventFilterController(IEventFilterService eventFilterService)
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
