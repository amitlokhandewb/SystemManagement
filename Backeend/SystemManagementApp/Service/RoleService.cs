using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class RoleService: IRoleService
    {
        private readonly IRoleRepository _repository;

        public RoleService(IRoleRepository repository)
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
