using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class RoleRepository
    {
        private readonly AppDbContext _context;

        public RoleRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<UserRole>> GetRolesAsync()
        {
            return await _context.UserRoles.ToListAsync();
        }
        public async Task<UserRole> GetUserRoleByIDAsync(int id)
        {
            var response = await _context.UserRoles.FirstOrDefaultAsync(x => x.Id == id);
            if (response == null)
            {
                return null;
            }
            return response;
        }
    }
}
