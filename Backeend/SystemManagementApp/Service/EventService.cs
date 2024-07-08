using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventService
    {
        private readonly EventRepository _eventRepository;

        public EventService(EventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }
        public async Task<IEnumerable<Events>> GetEventsAsync()
        {
            return await _eventRepository.GetEvents();
        }
        public async Task<Events> GetEventsById(int id)
        {
            return await _eventRepository.GetEventById(id);
        }
        public async Task<Events> CreateEvents(Events events)
        {
            return await _eventRepository.CreateEvent(events);
        }
        public async Task<Boolean> DeleteEvents(int id)
        {
            return await _eventRepository.DeleteEvent(id);
        }

    }
}
