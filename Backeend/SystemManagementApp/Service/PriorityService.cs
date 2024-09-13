using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class PriorityService: IPriorityService
    {
        private readonly IPriorityRepository _repository;

        public PriorityService(IPriorityRepository priorityRepository)
        {
            _repository = priorityRepository;
        }
        public async Task<IEnumerable<Priority>> GetPrioritiesAsync()
        {
            return await _repository.GetPrioritiesAsync();
        }
        public async Task<Priority> GetPriorityByIdAsync(int id)
        {
            return await _repository.GetPriorityByIdAsync(id);
        } 
        public async Task<Priority> GetPriorityByNameAsync(string priorityname)
        {
            return await _repository.GetPriorityByNameAsync(priorityname);
        }
        public async Task<Priority> CreatePriorityAsync(Priority priority)
        {
            return await _repository.CreatePriority(priority);
        }
        public async Task<Priority> UpdatePriorityAsync(Priority priority, int id)
        {
            return await _repository.UpdatePriority(priority, id);
        }
        public async Task<Boolean> DeletePriorityAsync(int id)
        {
            return await _repository.DeletePriority(id);
        }
    }
}
