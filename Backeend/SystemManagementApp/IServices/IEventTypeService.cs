using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IEventTypeService
    {
        public  Task<IEnumerable<EventType>> GetEventTypesAsync();
        public  Task<EventType> GetEventTypeByIdAsync(int id);
        public  Task<EventType> GetEventTypeByNameAsync(string eventtype);
        public  Task<EventType> CreateEventTypeAsync(EventType eventType);
        public  Task<EventType> UpdateEventTypeAsync(EventType eventType, int id);
        public  Task<Boolean> DeleteEventTypeAsync(int id);

    }
}
