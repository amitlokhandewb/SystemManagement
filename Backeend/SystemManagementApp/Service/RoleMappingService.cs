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
        public async Task<IEnumerable<RoleMapping>> GetRoleMapByParentAsync()
        {
            return await _roleMappingRepository.GetRoleMapByParentAsync();
        }
        public async Task<RoleMapping> GetRoleMapByPageNameAsync(string pageName)
        {
            return await _roleMappingRepository.GetRoleMapByPageNameAsync(pageName);
        }
        public async Task<RoleMapping> CreateRoleMappingAsync(RoleMapping roleMapping)
        {
            return await _roleMappingRepository.CreateRoleMapping(roleMapping);
        }
        public async Task<RoleMapping> UpdateRoleMappingAsync(RoleMapping roleMapping, int id)
        {
            return await _roleMappingRepository.UpdateRoleMapping(roleMapping, id);
        } 
        public async Task<bool> DeleteRoleMappingAsync(int id)
        {
            return await _roleMappingRepository.DeleteRoleMapping(id);
        }
    }
}
