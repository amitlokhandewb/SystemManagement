using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class EventDescriptionRepository
    {
        private readonly AppDbContext _context;

        public EventDescriptionRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EventDescription>> GetEventDescriptionAsync()
        {
            return await _context.EventDescription.ToListAsync();
        }
        public async Task<EventDescription> CreateEventDescription(EventDescription eventDescription)
        {
            var existingeventDescription = await _context.EventDescription.FindAsync(eventDescription.eventDescriptionId);
            if (existingeventDescription != null)
            {
                throw new InvalidOperationException($"A device type with ID {eventDescription.eventDescriptionId} already exists.");
            }
            _context.EventDescription.Add(eventDescription);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the plantName .", ex);
            }

            return eventDescription;
        }
        public async Task<EventDescription> UpdateEventDescription(EventDescription eventDescription, int id)
        {
            var eventDescriptionexist = await _context.EventDescription.FirstOrDefaultAsync(x => x.eventDescriptionId == id);
            if (eventDescriptionexist != null)
            {
                eventDescriptionexist.eventDescription = eventDescription.eventDescription;
                await _context.SaveChangesAsync();
                return eventDescriptionexist;
            }
            return eventDescription;
        }
        public async Task<Boolean> DeleteEventDescription(int id)
        {
            var eventDescriptionexist = await _context.EventDescription.FirstOrDefaultAsync(x => x.eventDescriptionId == id);
            if (eventDescriptionexist != null)
            {
                _context.EventDescription.Remove(eventDescriptionexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
