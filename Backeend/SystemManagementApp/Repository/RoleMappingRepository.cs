using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class RoleMappingRepository
    {
        private readonly AppDbContext _context;
        public RoleMappingRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RoleMapping>> GetRoleMappingListAsync()
        {
            return await _context.RoleMappings.ToListAsync();
        }
        public async Task<RoleMapping> GetRoleMapByIdAsync(int id)
        {
            return await _context.RoleMappings.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<RoleMapping> CreateRoleMapping(RoleMapping roleMapping)
        {
            var existing = await _context.RoleMappings.FirstOrDefaultAsync(x => x.pageName == roleMapping.pageName);
            if (existing != null)
            {
                throw new InvalidOperationException($" {roleMapping.pageName} already exists.");
            }
            _context.RoleMappings.Add(roleMapping);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the roleMapping .", ex);
            }

            return roleMapping;
        }
        public async Task<RoleMapping> UpdateRoleMapping(RoleMapping roleMapping, int id)
        {
            var exist = await _context.RoleMappings.FirstOrDefaultAsync(x => x.Id == id);
            if (exist != null)
            {
                exist.pageNo = roleMapping.pageNo;
                exist.pageName = roleMapping.pageName;
                exist.view = roleMapping.view;
                exist.add = roleMapping.add;
                exist.edit = roleMapping.edit;
                await _context.SaveChangesAsync();
                return exist;
            }
            return exist;
        }
        public async Task<Boolean> DeleteRoleMapping(int id)
        {
            var eexist = await _context.RoleMappings.FirstOrDefaultAsync(x => x.Id == id);
            if (eexist != null)
            {
                _context.RoleMappings.Remove(eexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
