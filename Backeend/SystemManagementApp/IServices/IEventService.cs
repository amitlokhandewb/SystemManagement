using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IEventService
    {
        public  Task<object> GetEventsAsync(int page, int pageLimit);
        public  Task<Events> GetEventsById(int id);
        public  Task<Events> CreateEvents(CreateEventDTO events);
        public  Task<bool> DeleteEvents(int id);
        public  Task<Events> CreateRandomEventAsync();

    }
}
