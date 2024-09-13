using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IRoleRepository
    {
        public  Task<IEnumerable<UserRole>> GetRolesAsync();
        public  Task<UserRole> GetUserRoleByIDAsync(int id);

    }
}
