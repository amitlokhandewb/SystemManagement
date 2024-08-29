using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class PagePerissionRepository
    {
        private readonly AppDbContext _context;

        public PagePerissionRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public async Task<PagePermission> CreatePagepermsissonAsync(int rolemappingId, int roleId)
        {
            var creaetePage = new PagePermission()
            {
                rolemappingId = rolemappingId,
                roleId = roleId,
                view = false,
                modify = false,
            };

             _context.PagePermissions.Add(creaetePage);
            await _context.SaveChangesAsync();
            return creaetePage;

        }
    }
}
