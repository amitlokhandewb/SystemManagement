using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IPriorityService
    {
        public  Task<IEnumerable<Priority>> GetPrioritiesAsync();
        public  Task<Priority> GetPriorityByIdAsync(int id);
        public  Task<Priority> GetPriorityByNameAsync(string priorityname);
        public  Task<Priority> CreatePriorityAsync(Priority priority);
        public  Task<Priority> UpdatePriorityAsync(Priority priority, int id);
        public  Task<Boolean> DeletePriorityAsync(int id);

    }
}
