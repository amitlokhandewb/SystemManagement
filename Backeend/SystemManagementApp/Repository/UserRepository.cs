using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ActionBy>> GetUsersAsync()
        {
            return await _context.ActionBies.ToListAsync();
        } 
        public async Task<ActionBy> GetUsersByIdAsync(int id)
        {
            return await _context.ActionBies.FirstOrDefaultAsync(x => x.actionById == id);
        }
        public async Task<ActionBy> CreateUser(ActionBy users)
        {
            var existingusers = await _context.ActionBies.FirstOrDefaultAsync(x => x.actionName ==  users.actionName);
            if (existingusers != null)
            {
                throw new InvalidOperationException($"A device type with ID {users.actionName} already exists.");
            }
            _context.ActionBies.Add(users);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the plantName .", ex);
            }

            return users;
        }
        public async Task<ActionBy> UpdateUser(ActionBy user, int id)
        {
            var userexist = await _context.ActionBies.FirstOrDefaultAsync(x => x.actionById == id);
            if (userexist != null)
            {
                userexist.actionName = user.actionName;
                await _context.SaveChangesAsync();
                return userexist;
            }
            return user;
        }
        public async Task<Boolean> DeleteUser(int id)
        {
            var userexist = await _context.ActionBies.FirstOrDefaultAsync(x => x.actionById == id);
            if (userexist != null)
            {
                _context.ActionBies.Remove(userexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
