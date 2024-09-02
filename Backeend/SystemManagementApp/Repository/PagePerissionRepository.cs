using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SystemManagementApp.Data;
using SystemManagementApp.DTOs;
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

        public async Task<PagePermission> GetPagepermissionByIdAsync(int id)
        {
            return await _context.PagePermissions.FirstOrDefaultAsync(x => x.id == id);
        }
        public async Task<PagePermission> TogglePagepermissionAsync(string type, bool value,int id)
        {
            var alreadyexist = await _context.PagePermissions.FirstOrDefaultAsync(x => x.id == id );
            if (alreadyexist == null)
            {
                return null;
            }
            if(type == "view")
            {
                alreadyexist.view = value;
                if(value == false)
                {
                    alreadyexist.modify = false;
                }

            }
            else
            {
                alreadyexist.modify = value;
            }

            _context.SaveChanges();
            return alreadyexist;

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
        public async Task<CreatePagePermissionDTO> UpdatePagePermissionAsync(CreatePagePermissionDTO createPagePermissionDTO)
        {
            var alreadyexist = await _context.PagePermissions.FirstOrDefaultAsync(x => x.roleId == createPagePermissionDTO.roleId && x.rolemappingId == createPagePermissionDTO.roleMappingId);
            if (alreadyexist == null)
            {
                return null;
            }
            var updateddata = new PagePermission
            {
                modify = createPagePermissionDTO.modify,
                view = createPagePermissionDTO.view,
            };
            _context.SaveChanges();
            return createPagePermissionDTO; 

        }
    }
}