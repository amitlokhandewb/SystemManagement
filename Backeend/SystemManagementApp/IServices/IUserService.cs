using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IUserService
    {
        public  Task<IEnumerable<ActionBy>> GetUsersAsync();
        public  Task<ActionBy> GetUsersByIdAsync(int id);
        public  Task<ActionBy> GetUsersByNameAsync(string name);
        public  Task<ActionBy> CreateUserAsync(ActionBy actionBy);
        public  Task<ActionBy> UpdateUserAsync(ActionBy actionBy, int id);
        public  Task<Boolean> DeleteUserAsync(int id);

    }
}
