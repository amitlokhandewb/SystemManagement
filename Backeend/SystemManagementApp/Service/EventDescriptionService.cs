using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventDescriptionService: IEventDescritionService
    {
        private readonly IEventDescriptionRepository _repository;

        public EventDescriptionService(IEventDescriptionRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<EventDescription>> GetEventDescriptionsAsync()
        {
            return await _repository.GetEventDescriptionAsync();
        } 
        public async Task<EventDescription> GetEventDescriptionByIdAsync(int id)
        {
            return await _repository.GetEventDescriptionByIdAsync(id);
        }
        public async Task<EventDescription> GetEventDescriptionByNameAsync(string eventdescription)
        {
            return await _repository.GetEventDescriptionByNameAsync(eventdescription);
        }
        public async Task<EventDescription> CreateEventDescriptionAsync(EventDescription eventDescription)
        {
            return await _repository.CreateEventDescription(eventDescription);
        }
        public async Task<EventDescription> UpdateEventDescriptionAsync(EventDescription eventDescription, int id)
        {
            return await _repository.UpdateEventDescription(eventDescription, id);
        }
        public async Task<Boolean> DeleteEventDescriptionAsync(int id)
        {
            return await _repository.DeleteEventDescription(id);
        }
    }
}
