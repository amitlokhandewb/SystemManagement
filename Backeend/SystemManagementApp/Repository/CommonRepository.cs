using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class CommonRepository
    {
        private readonly AppDbContext _context;
        public CommonRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Priority>> GetPriorities()
        {
            return await _context.Priorities.ToListAsync();
        }
        public async Task<Priority> CreatePriority(Priority priority)
        {
            _context.Priorities.Add(priority);
            await _context.SaveChangesAsync();
            return priority;
        }
        public async Task<IEnumerable<EventType>> GetEventTypes()
        {
            return await _context.EventTypes.ToListAsync();
        }
        public async Task<EventType> CreateEventType(EventType eventType)
        {
            _context.EventTypes.Add(eventType);
            await _context.SaveChangesAsync();
            return eventType;
        } 
        public async Task<IEnumerable<DeviceType>> GetDeviceType()
        {
            return await _context.DeviceTypes.ToListAsync();
        }
        public async Task<DeviceType> CreateDeviceType(DeviceType deviceType)
        {
            _context.DeviceTypes.Add(deviceType);
            await _context.SaveChangesAsync();
            return deviceType;
        }
        public async Task<IEnumerable<PlantName>> GetPlantNames()
        {
            return await _context.PlantName.ToListAsync();
        }  
        public async Task<PlantName> CreatePlant(PlantName plantName)
        {
            _context.PlantName.Add(plantName);
            await _context.SaveChangesAsync();
            return plantName;
        }
        public async Task<IEnumerable<ActionBy>> GetActionBies()
        {
            return await _context.ActionBies.ToListAsync();
        }  
        public async Task<IEnumerable<EventDescription>> GetEventDescriptions()
        {
            return await _context.EventDescription.ToListAsync();
        }
    }
}
