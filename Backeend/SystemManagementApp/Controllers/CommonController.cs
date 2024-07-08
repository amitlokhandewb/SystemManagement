using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly CommonService _commonService;
        public CommonController(CommonService commonService)
        {
            _commonService = commonService;
        }
        [HttpGet("GetPrioritiesAsync")]
        public async Task<ActionResult<IEnumerable<Priority>>> GetPrioritiesAsync()
        {
            var data = await _commonService.GetPrioritiesAsync();
            if(data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("GetEventTypesAsync")]
        public async Task<ActionResult<IEnumerable<EventType>>> GetEventTypesAsync()
        {
            var data = await _commonService.GetEventTypes();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("GetDeviceTypesAsync")]
        public async Task<ActionResult<IEnumerable<DeviceType>>> GetDeviceTypesAsync()
        {
            var data = await _commonService.GetDeviceTypes();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("GetPlantNamesAsync")]
        public async Task<ActionResult<IEnumerable<PlantName>>> GetPlantNamesAsync()
        {
            var data = await _commonService.GetPlantNames();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("GetActionBiesAsync")]
        public async Task<ActionResult<IEnumerable<ActionBy>>> GetActionBiesAsync()
        {
            var data = await _commonService.GetActionBies();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
        [HttpGet("GetEventDescriptionsAsync")]
        public async Task<ActionResult<IEnumerable<PlantName>>> GetEventDescriptionsAsync()
        {
            var data = await _commonService.GetEventDescriptions();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }
    }
}
