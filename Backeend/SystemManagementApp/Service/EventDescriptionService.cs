using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventDescriptionService
    {
        private readonly EventDescriptionRepository _repository;

        public EventDescriptionService(EventDescriptionRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<EventDescription>> GetEventDescriptionsAsync()
        {
            return await _repository.GetEventDescriptionAsync();
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
