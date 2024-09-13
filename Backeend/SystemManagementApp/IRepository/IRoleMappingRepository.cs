using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IRoleMappingRepository
    {
        public  Task<IEnumerable<RoleMapping>> GetRoleMappingListAsync();
        public  Task<RoleMapping> GetRoleMapByIdAsync(int id);
        public  Task<RoleMapping> GetRoleMapByPageNameAsync(string pageName);
        public  Task<IEnumerable<RoleMapping>> GetRoleMapByParentAsync();
        public  Task<RoleMapping> CreateRoleMapping(RoleMapping roleMapping);
        public  Task<RoleMapping> UpdateRoleMapping(RoleMapping roleMapping, int id);
        public  Task<Boolean> DeleteRoleMapping(int id);

    }
}
