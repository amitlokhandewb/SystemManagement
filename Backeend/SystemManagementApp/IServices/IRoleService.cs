using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IRoleService
    {
        public  Task<IEnumerable<UserRole>> GetUserRolesAsync();
        public  Task<UserRole> GetUserRoleByID(int id);

    }
}
