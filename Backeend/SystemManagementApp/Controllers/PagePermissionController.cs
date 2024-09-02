using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagePermissionController : ControllerBase
    {
        private readonly PagePermissionService _permissionService;

        public PagePermissionController(PagePermissionService permissionService)
        {
            _permissionService = permissionService;
        }
        [HttpPut("TogglePagePermission/{id}")]
        public async Task<ActionResult<PagePermission>> TogglePagePermission(string type, bool value, int id)
        {
            var response = await _permissionService.TogglePagepermissionAsync(type, value, id);
            if(response != null)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest("Failed to update Page permission.");
            }


        }


    }
}
