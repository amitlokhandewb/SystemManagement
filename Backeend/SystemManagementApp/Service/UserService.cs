using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<ActionBy>> GetUsersAsync()
        {
            return await _userRepository.GetUsersAsync();
        }
        public async Task<ActionBy> GetUsersByIdAsync(int id)
        {
            return await _userRepository.GetUsersByIdAsync(id);
        }
        public async Task<ActionBy> GetUsersByNameAsync(string name)
        {
            return await _userRepository.GetUsersByNameAsync(name);
        }
        public async Task<ActionBy> CreateUserAsync(ActionBy actionBy)
        {
            return await _userRepository.CreateUser(actionBy);
        }
        public async Task<ActionBy> UpdateUserAsync(ActionBy actionBy, int id)
        {
            return await _userRepository.UpdateUser(actionBy, id);
        }
        public async Task<Boolean> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteUser(id);
        }
    }
}
