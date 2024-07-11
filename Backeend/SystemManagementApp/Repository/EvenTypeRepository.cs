using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class EvenTypeRepository
    {
        private readonly AppDbContext _context;

        public EvenTypeRepository(AppDbContext appContext)
        {
            _context = appContext;
        }
        public async Task<IEnumerable<EventType>> GetEventTypesAsync()
        {
            return await _context.EventTypes.ToListAsync();
        }
        public async Task<EventType> CreateEventType(EventType eventType)
        {
            var existingEventType = await _context.EventTypes.FindAsync(eventType.eventTypeId);
            if (existingEventType != null)
            {
                throw new InvalidOperationException($"A device type with ID {eventType.eventTypeId} already exists.");
            }
            _context.EventTypes.Add(eventType);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the eventType .", ex);
            }

            return eventType;
        }
        public async Task<EventType> UpdateEventType(EventType eventType, int id)
        {
            var eventTypeexist = await _context.EventTypes.FirstOrDefaultAsync(x => x.eventTypeId == id);
            if (eventTypeexist != null)
            {
                eventTypeexist.eventTypeName = eventType.eventTypeName;
                await _context.SaveChangesAsync();
                return eventTypeexist;
            }
            return eventType;
        }
        public async Task<Boolean> DeleteEventType(int id)
        {
            var eventTypeexist = await _context.EventTypes.FirstOrDefaultAsync(x => x.eventTypeId == id);
            if (eventTypeexist != null)
            {
                _context.EventTypes.Remove(eventTypeexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
