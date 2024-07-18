using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class RoleService
    {
        private readonly RoleRepository _repository;

        public RoleService(RoleRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<UserRole>> GetUserRolesAsync()
        {
            return await _repository.GetRolesAsync();
        }
        public async Task<UserRole> GetUserRoleByID(int id)
        {
            return await _repository.GetUserRoleByIDAsync(id);
        }
    }
}
