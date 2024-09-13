using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class RoleMappingController : ControllerBase
    {
        private readonly IRoleMappingService _roleMappingService;
        private readonly IRoleService _roleService;
        private readonly IPagePermissionService _pagePermissionService;

        public RoleMappingController(IRoleMappingService roleMappingService, IRoleService roleService, IPagePermissionService pagePermissionService)
        {
            _roleMappingService = roleMappingService;
            _roleService = roleService;
            _pagePermissionService = pagePermissionService;
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
        [HttpGet("GetRoleMapByDropDownAsync")]
        public async Task<ActionResult<IEnumerable<RoleMapping>>> GetRoleMapByParentIdAsync()
        {
            var reponse = await _roleMappingService.GetRoleMapByParentAsync();
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        } 
        [HttpGet("GetComponentsByRoleId/{id}")]
        public async Task<ActionResult<IEnumerable<RoleMapping>>> GetComponentsByRoleId(int id)
        {
            var reponse = await _roleMappingService.GetAccesByRoleId(id);
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        } 
        [HttpGet("GetAccesByRoleforId/{id}")]
        public async Task<ActionResult<IEnumerable<RoleMapping>>> GetAccesByRoleforId(int id)
        {
            var reponse = await _roleMappingService.GetAccesByRoleforId(id);
            if (reponse == null)
            {
                return NotFound();
            }
            return Ok(reponse);
        }
        [HttpPost("CreateRoleMapping")]
        public async Task<ActionResult<RoleMapping>> CreateRoleMapping(RoleMapping roleMapping)
        {
            //var alreadyexist = await _roleMappingService.GetRoleMapByPageNameAsync(roleMapping.pageName);
            //if (alreadyexist != null)
            //{
            //    return BadRequest("PageName Already Exist");
            //}
            //var reponse = await _roleMappingService.CreateRoleMappingAsync(roleMapping);
            //if (reponse == null)
            //{
            //    return NotFound();
            //}
            //return Ok("Page Added Successfully");
            return NoContent();
        }
        [HttpPost("AddComponents")]
        public async Task<ActionResult<bool>> AddComponents(string component, int parentId)
        {
            var alreadyexist = await _roleMappingService.GetRoleMapByPageNameAsync(component);
            if(alreadyexist != null)
            {
                return BadRequest($"{component} already exist");
            }
            var createcomponent = new RoleMapping
            {
                parentId = parentId,
                pageName = component
            };

            var response = await _roleMappingService.CreateRoleMappingAsync(createcomponent);
            var creaetpagepermission = await _pagePermissionService.CreatePagepermsissonAsync(response.Id);
            return Ok("Page Created Successfully");
        }
        [HttpPut("UpdateRoleMapping/{id}")]
        public async Task<ActionResult<RoleMapping>> UpdateRoleMapping(RoleMapping roleMapping, int id)
        {
            //var alreadyexist = await _roleMappingService.GetRoleMapByPageNameAsync(roleMapping.pageName);
            //if (alreadyexist != null)
            //{
            //    return BadRequest("PageName Already Exist");
            //}
            //var reponse = await _roleMappingService.UpdateRoleMappingAsync(roleMapping, id);
            //if (reponse == null)
            //{
            //    return NotFound();
            //}
            //return Ok("Page Name Updated Successfully");
            return NoContent();
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
