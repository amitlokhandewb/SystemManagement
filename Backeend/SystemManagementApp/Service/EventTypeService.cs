using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventTypeService:IEventTypeService
    {
        private readonly IEventTypeRepository _typeRepository;

        public EventTypeService(IEventTypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }
        public async Task<IEnumerable<EventType>> GetEventTypesAsync()
        {
            return await _typeRepository.GetEventTypesAsync();
        }
        public async Task<EventType> GetEventTypeByIdAsync(int id)
        {
            return await _typeRepository.GetEventTypeByIdAsync(id);
        }
        public async Task<EventType> GetEventTypeByNameAsync(string eventtype)
        {
            return await _typeRepository.GetEventTypeByNameAsync(eventtype);
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
