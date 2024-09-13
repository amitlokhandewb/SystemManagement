using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IEventDescriptionRepository
    {
        public  Task<IEnumerable<EventDescription>> GetEventDescriptionAsync();
        public  Task<EventDescription> GetEventDescriptionByIdAsync(int id);
        public  Task<EventDescription> GetEventDescriptionByNameAsync(string eventdescription);
        public  Task<EventDescription> CreateEventDescription(EventDescription eventDescription);
        public  Task<EventDescription> UpdateEventDescription(EventDescription eventDescription, int id);
        public  Task<Boolean> DeleteEventDescription(int id);

    }
}
