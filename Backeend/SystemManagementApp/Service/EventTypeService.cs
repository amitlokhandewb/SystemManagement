using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventTypeService
    {
        private readonly EvenTypeRepository _typeRepository;

        public EventTypeService(EvenTypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }
        public async Task<IEnumerable<EventType>> GetEventTypesAsync()
        {
            return await _typeRepository.GetEventTypesAsync();
        }
        public async Task<EventType> CreateEventTypeAsync(EventType eventType)
        {
            return await _typeRepository.CreateEventType(eventType);
        }
        public async Task<EventType> UpdateEventTypeAsync(EventType eventType, int id)
        {
            return await _typeRepository.UpdateEventType(eventType, id);
        }
        public async Task<Boolean> DeleteEventTypeAsync(int id)
        {
            return await _typeRepository.DeleteEventType(id);
        }

    }
}
