using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
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
        public async Task<Events> CreateEvent(Events events)
        {
              _dbContext.Events.Add(events);
              await _dbContext.SaveChangesAsync();
              return events;
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
