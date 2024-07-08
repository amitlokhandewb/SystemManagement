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
        public async Task<IEnumerable<EventType>> GetEventTypes()
        {
            return await _context.EventTypes.ToListAsync();
        }
        public async Task<IEnumerable<DeviceType>> GetDeviceType()
        {
            return await _context.DeviceTypes.ToListAsync();
        }
        public async Task<IEnumerable<PlantName>> GetPlantNames()
        {
            return await _context.PlantName.ToListAsync();
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
