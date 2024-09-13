using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IEndUserService
    {
        public  Task<IEnumerable<EndUser>> GetEndUsersAsync();
        public  Task<EndUser> GetEndUserByIdAsync(int id);
        public  Task<EndUser> GetEndUserByUserNameAsync(string username);
        public  Task<EndUser> GetEndUserByEmailAsync(string username);
        public  Task<EndUser> CreateEndUserAsync(CreateEndUser createEndUser);
        public  Task<EndUser> UpdateEndUserAsync(CreateEndUser createEndUser, int id);
        public  Task<EndUser> ToggleEndUserAsync(bool toggledata, int id);
        public  Task<Boolean> DeleteEndUserAsync(int id);

    }
}
