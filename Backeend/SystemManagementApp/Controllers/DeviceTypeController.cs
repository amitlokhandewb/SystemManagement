using Microsoft.AspNetCore.Authorization;
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

    public class DeviceTypeController : ControllerBase
    {
        private readonly IDeviceTypeService _deviceTypeService;

        public DeviceTypeController(IDeviceTypeService deviceTypeService)
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
        [HttpGet("GetDeviceTypeById/{id}")]
        public async Task<ActionResult<DeviceType>> GetDeviceTypeById(int id)
        {
            var response = await _deviceTypeService.GetDeviceTypeByIdAsync(id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreateDeviceTypeAsync")]
        public async Task<ActionResult<DeviceType>> CreateDeviceTypeAsync(DeviceType deviceType)
        {
            if(deviceType.deviceName == "")
            {
                return BadRequest("A device Type cannot be empty");
            }
            var alreadyexist = await _deviceTypeService.GetDeviceTypeByNameAsync(deviceType.deviceName);
            if(alreadyexist != null)
            {
                return BadRequest("A device Type Already Exist");
            }
            var response = await _deviceTypeService.CreateDeviceTypeAsync(deviceType);
            if(response != null)
            {
                return Ok("Device Type Added Successfully");
            }
            return NotFound();
        }
        [HttpPut("UpdateDeviceTypeAsync/{id}")]
        public async Task<ActionResult<DeviceType>> UpdateDeviceTypeAsync(DeviceType deviceType, int id)
        {
            var alreadyexist = await _deviceTypeService.GetDeviceTypeByNameAsync(deviceType.deviceName);
            if (alreadyexist != null)
            {
                return BadRequest("A device Type Already Exist");
            }
            var response = await _deviceTypeService.UpdateDeviceTypeAsync(deviceType,id);
            if (response != null)
            {
                return Ok("Device Type Updated Successfully");
            }
            else
            {
                return BadRequest("Failed to update device type");
            }
            
        }
        [HttpDelete("DeleteDeviceTypeAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeleteDeviceTypeAsync(int id)
        {
            var response = await _deviceTypeService.DeleteDeviceTypeAsync( id);
            if (response == false)
            {
                return BadRequest("Error occured while deleting the Device Type");
            }
            return Ok("Device Type Deleted Successfully");
        }
       
    }
}
