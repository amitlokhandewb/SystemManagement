using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class EventRepository
    {
        private readonly AppDbContext _dbContext;
        
        public EventRepository(AppDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }
        public async Task<IEnumerable<Events>> GetEvents()
        {
            return await _dbContext.Events.OrderByDescending(x => x.dateTime).ToListAsync();
        }
        public async Task<Events> GetEventById(int id)
        {
            var eventexist = await _dbContext.Events.FirstOrDefaultAsync(x => x.id == id);
            if (eventexist != null)
            {
                return eventexist;
            }
            return null;
        }
        public async Task<Events> CreateEvent(CreateEventDTO events)
        {
            var newEvent = new Events
            {
                eventDescriptionId = events.eventDescription,
                eventTypeId = events.eventType,
                eventid = events.eventid,
                priorityId = events.priority,
                dateTime = events.dateTime,
                plantId = events.plantId,
                deviceTypeId = events.deviceTypeId,
                actionById = events.actionBy,
            };
              _dbContext.Events.Add(newEvent);
              await _dbContext.SaveChangesAsync();
              return newEvent;
        }
        public async Task<Boolean> DeleteEvent(int id)
        {
            var eventexist = await _dbContext.Events.FirstOrDefaultAsync(x => x.id == id);
            if(eventexist != null)
            {
                 _dbContext.Events.Remove(eventexist);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }



    }
}
