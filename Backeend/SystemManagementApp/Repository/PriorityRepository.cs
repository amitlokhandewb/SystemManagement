using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class PriorityRepository
    {
        private readonly AppDbContext _context;

        public PriorityRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public async Task<IEnumerable<Priority>> GetPrioritiesAsync()
        {
            return await _context.Priorities.ToListAsync();
        } 
        public async Task<Priority> GetPriorityByIdAsync(int id)
        {
            return await _context.Priorities.FirstOrDefaultAsync(x => x.priorityId == id);
        }
        public async Task<Priority> CreatePriority(Priority priority)
        {
            var existingPriority = await _context.Priorities.FirstOrDefaultAsync(x => x.priorityName == priority.priorityName);
            if (existingPriority != null)
            {
                throw new InvalidOperationException($"A device type with ID {priority.priorityName} Already exists.");
            }
            _context.Priorities.Add(priority);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the plantName .", ex);
            }

            return priority;
        }
        public async Task<Priority> UpdatePriority(Priority priority, int id)
        {
            var priorityexist = await _context.Priorities.FirstOrDefaultAsync(x => x.priorityId == id);
            if (priorityexist != null)
            {
                priorityexist.priorityName = priority.priorityName;
                await _context.SaveChangesAsync();
                return priorityexist;
            }
            return priority;
        }
        public async Task<Boolean> DeletePriority(int id)
        {
            var priorityexist = await _context.Priorities.FirstOrDefaultAsync(x => x.priorityId == id);
            if (priorityexist != null)
            {
                _context.Priorities.Remove(priorityexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
