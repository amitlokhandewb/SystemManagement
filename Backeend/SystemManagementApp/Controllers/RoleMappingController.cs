using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class RoleMappingController : ControllerBase
    {
        private readonly RoleMappingService _roleMappingService;
        private readonly RoleService _roleService;

        public RoleMappingController(RoleMappingService roleMappingService, RoleService roleService)
        {
            _roleMappingService = roleMappingService;
            _roleService = roleService;
        }
        [HttpGet("GetAllRoleMapping")]
        public async Task<ActionResult<IEnumerable<RoleMapping>>> GetAllRoleMapping()
        {
            var reponse = await _roleMappingService.GetRoleMapListAsync();
            if(reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        }
        [HttpGet("GetRoleMappingById/{id}")]
        public async Task<ActionResult<RoleMapping>> GetRoleMappingById(int id)
        {
            var reponse = await _roleMappingService.GetRoleMapByIdAsync(id);
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        } 
        [HttpGet("GetComponentsByRoleId/{id}")]
        public async Task<ActionResult<IEnumerable<RoleMapping>>> GetComponentsByRoleId(int id)
        {
            var reponse = await _roleMappingService.GetRoleMapByRoleIdAsync(id);
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        }
        [HttpPost("CreateRoleMapping")]
        public async Task<ActionResult<RoleMapping>> CreateRoleMapping(RoleMapping roleMapping)
        {
            var reponse = await _roleMappingService.CreateRoleMappingAsync(roleMapping);
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        }
        [HttpPost("AddComponents")]
        public async Task<ActionResult<bool>> AddComponents(string component)
        {
            var roles = await _roleService.GetUserRolesAsync();
            if (roles == null)
            {
                return NotFound();
            }
            foreach (var role in roles)
            {
                var createcomponent = new RoleMapping
                {
                    roleId = role.Id,
                    pageName = component
                };
                await _roleMappingService.CreateRoleMappingAsync(createcomponent);
            }
            return Ok(true);
        }
        [HttpPut("UpdateRoleMapping/{id}")]
        public async Task<ActionResult<RoleMapping>> UpdateRoleMapping(RoleMapping roleMapping, int id)
        {
            var reponse = await _roleMappingService.UpdateRoleMappingAsync(roleMapping, id);
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        }
        [HttpDelete("DeleteRoleMapping/{id}")]
        public async Task<ActionResult<bool>> DeleteRoleMapping(int id)
        {
            var reponse = await _roleMappingService.DeleteRoleMappingAsync(id);
            if (reponse == false)
            {
                return NotFound();
            }
            return Ok(reponse);
        }
    }
}
