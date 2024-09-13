using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IRoleMappingService
    {
        public  Task<IEnumerable<RoleMapping>> GetRoleMapListAsync();
        public  Task<RoleMapping> GetRoleMapByIdAsync(int id);
        public  Task<IEnumerable<RoleMapping>> GetRoleMapByParentAsync();
        public  Task<RoleMapping> GetRoleMapByPageNameAsync(string pageName);
        public  Task<RoleMapping> CreateRoleMappingAsync(RoleMapping roleMapping);
        public  Task<RoleMapping> UpdateRoleMappingAsync(RoleMapping roleMapping, int id);
        public  Task<bool> DeleteRoleMappingAsync(int id);
        public  Task<object> GetAccesByRoleId(int roleId);
        public  Task<object> GetAccesByRoleforId(int roleId);

    }
}
