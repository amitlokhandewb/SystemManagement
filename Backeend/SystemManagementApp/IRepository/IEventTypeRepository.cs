using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IEventTypeRepository
    {
        public  Task<IEnumerable<EventType>> GetEventTypesAsync();
        public  Task<EventType> GetEventTypeByIdAsync(int id);
        public  Task<EventType> GetEventTypeByNameAsync(string eventtype);
        public  Task<EventType> CreateEventType(EventType eventType);
        public  Task<EventType> UpdateEventType(EventType eventType, int id);
        public  Task<Boolean> DeleteEventType(int id);


    }
}
