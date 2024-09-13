using SystemManagementApp.DTOs;
using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EndUserService:IEndUserService
    {
        private readonly IEndUserRepository _endUserRepository;

        public EndUserService(IEndUserRepository endUserRepository)
        {
            _endUserRepository = endUserRepository;
        }
        public async Task<IEnumerable<EndUser>> GetEndUsersAsync()
        {
            return await _endUserRepository.GetEndUsersAsync();
        }
        public async Task<EndUser> GetEndUserByIdAsync(int id)
        {
            return await _endUserRepository.GetEndUserByIdAsync(id);
        }
        public async Task<EndUser> GetEndUserByUserNameAsync(string username)
        {
            return await _endUserRepository.GetEndUserByUserNameAsync(username);
        }
        public async Task<EndUser> GetEndUserByEmailAsync(string username)
        {
            return await _endUserRepository.GetEndUserByEmailAsync(username);
        }
        public async Task<EndUser> CreateEndUserAsync(CreateEndUser createEndUser)
        {
            return await _endUserRepository.CreateEndUserAsync(createEndUser);
        }
        public async Task<EndUser> UpdateEndUserAsync(CreateEndUser createEndUser, int id)
        {
            return await _endUserRepository.UpdateEndUserAsync(createEndUser, id);
        }
        public async Task<EndUser> ToggleEndUserAsync(bool toggledata, int id)
        {
            return await _endUserRepository.ToggleEndUserAsync(toggledata, id);
        }
        public async Task<Boolean> DeleteEndUserAsync(int id)
        {
            return await _endUserRepository.DeleteEndUserAsync(id);
        }

    }
}
