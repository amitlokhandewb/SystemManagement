using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IEventRepository
    {
        public  Task<IEnumerable<Events>> GetEvents();
        public  Task<Events> GetEventById(int id);
        public  Task<Events> CreateEvent(CreateEventDTO events);
        public  Task<Boolean> DeleteEvent(int id);

    }
}
