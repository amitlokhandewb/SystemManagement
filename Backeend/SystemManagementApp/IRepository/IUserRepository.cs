using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IUserRepository
    {
        public  Task<IEnumerable<ActionBy>> GetUsersAsync();
        public  Task<ActionBy> GetUsersByIdAsync(int id);
        public  Task<ActionBy> GetUsersByNameAsync(string name);
        public  Task<ActionBy> CreateUser(ActionBy users);
        public  Task<ActionBy> UpdateUser(ActionBy user, int id);
        public  Task<Boolean> DeleteUser(int id);

    }
}
