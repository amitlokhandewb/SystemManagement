using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IEventDescritionService
    {
        public  Task<IEnumerable<EventDescription>> GetEventDescriptionsAsync();
        public  Task<EventDescription> GetEventDescriptionByIdAsync(int id);
        public  Task<EventDescription> GetEventDescriptionByNameAsync(string eventdescription);
        public  Task<EventDescription> CreateEventDescriptionAsync(EventDescription eventDescription);
        public  Task<EventDescription> UpdateEventDescriptionAsync(EventDescription eventDescription, int id);
        public  Task<Boolean> DeleteEventDescriptionAsync(int id);

    }
}
