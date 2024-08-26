using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class RoleMappingService
    {
        private readonly RoleMappingRepository _roleMappingRepository;

        public RoleMappingService(RoleMappingRepository roleMappingRepository)
        {
            _roleMappingRepository = roleMappingRepository;
        }
        public async Task<IEnumerable<RoleMapping>> GetRoleMapListAsync()
        {
            return await _roleMappingRepository.GetRoleMappingListAsync();
        }
        public async Task<RoleMapping> GetRoleMapByIdAsync(int id)
        {
            return await _roleMappingRepository.GetRoleMapByIdAsync(id);
        }
        public async Task<RoleMapping> GetRoleMapByPageNameAsync(string pageName)
        {
            return await _roleMappingRepository.GetRoleMapByPageNameAsync(pageName);
        }
        public async Task<IEnumerable<RoleMapping>> GetRoleMapByRoleIdAsync(int id)
        {
            return await _roleMappingRepository.GetRoleMapByRoleIdAsync(id);
        }
        public async Task<RoleMapping> CreateRoleMappingAsync(RoleMapping roleMapping)
        {
            return await _roleMappingRepository.CreateRoleMapping(roleMapping);
        }
        public async Task<RoleMapping> UpdateRoleMappingAsync(RoleMapping roleMapping, int id)
        {
            return await _roleMappingRepository.UpdateRoleMapping(roleMapping, id);
        } 
        public async Task<RoleMapping> ToggleRoleMapping(int id,string type, bool typevalue)
        {
            return await _roleMappingRepository.ToggleRoleMapping(id, type, typevalue);
        }
        public async Task<bool> DeleteRoleMappingAsync(int id)
        {
            return await _roleMappingRepository.DeleteRoleMapping(id);
        }
        public async Task<IEnumerable<object>> GetUniquesPageNamesAsync()
        {
            return await _roleMappingRepository.GetUniquesPageNamesAsync();
        }
        public async Task<IEnumerable<RoleMapping>> GetChildbyTabNameAsync(string tabname,int roleid)
        {
            var devicesetting = await _roleMappingRepository.GetParentAsync(tabname);
            var childList = await _roleMappingRepository.GetChildListAsync(devicesetting.Id, roleid);
            return childList;
        }
    }
}
