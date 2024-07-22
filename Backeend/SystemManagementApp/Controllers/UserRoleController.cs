using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class UserRoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public UserRoleController(RoleService roleService)
        {
            _roleService = roleService;
        }
        [HttpGet("GetUserRolesAsync")]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetUserRolesAsync()
        {
            var response = await _roleService.GetUserRolesAsync();
            if(response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }
        [HttpGet("GetUserRoleById/{id}")]
        public async Task<ActionResult<UserRole>> GetUserRoleById(int id)
        {
            var response = await _roleService.GetUserRoleByID(id);
            if(response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }
    }
}
