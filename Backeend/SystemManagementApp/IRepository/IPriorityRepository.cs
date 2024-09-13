using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IPriorityRepository
    {
        public  Task<IEnumerable<Priority>> GetPrioritiesAsync();
        public  Task<Priority> GetPriorityByIdAsync(int id);
        public  Task<Priority> GetPriorityByNameAsync(string priorityname);
        public  Task<Priority> CreatePriority(Priority priority);
        public  Task<Priority> UpdatePriority(Priority priority, int id);
        public  Task<Boolean> DeletePriority(int id);
    }
}
