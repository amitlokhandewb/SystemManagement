using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceTypeController : ControllerBase
    {
        private readonly DeviceTypeService _deviceTypeService;

        public DeviceTypeController(DeviceTypeService deviceTypeService)
        {
            _deviceTypeService = deviceTypeService;
        }
        [HttpGet("GetAllDeviceTypeAsync")]
        public async Task<ActionResult<IEnumerable<DeviceType>>> GetAllDeviceTypeAsync()
        {
            var response = await _deviceTypeService.GetDeviceTypesAsync();
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreateDeviceTypeAsync")]
        public async Task<ActionResult<DeviceType>> CreateDeviceTypeAsync(DeviceType deviceType)
        {
            var response = await _deviceTypeService.CreateDeviceTypeAsync(deviceType);
            if(response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPut("UpdateDeviceTypeAsync/{id}")]
        public async Task<ActionResult<DeviceType>> UpdateDeviceTypeAsync(DeviceType deviceType, int id)
        {
            var response = await _deviceTypeService.UpdateDeviceTypeAsync(deviceType,id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpDelete("DeleteDeviceTypeAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteDeviceTypeAsync(int id)
        {
            var response = await _deviceTypeService.DeleteDeviceTypeAsync( id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
