using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IEndUserRepository
    {
        public  Task<IEnumerable<EndUser>> GetEndUsersAsync();
        public  Task<EndUser> GetEndUserByIdAsync(int id);
        public  Task<EndUser> GetEndUserByUserNameAsync(string username);
        public  Task<EndUser> GetEndUserByEmailAsync(string email);
        public  Task<EndUser> CreateEndUserAsync(CreateEndUser createEndUser);
        public  Task<EndUser> UpdateEndUserAsync(CreateEndUser updateEndUser, int id);
        public  Task<EndUser> ToggleEndUserAsync(bool toggledata, int id);
        public  Task<Boolean> DeleteEndUserAsync(int id);

    }
}
