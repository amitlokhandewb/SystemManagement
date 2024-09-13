using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IPagePermissionRepository
    {
        public  Task<PagePermission> GetPagepermissionByIdAsync(int id);
        public  Task<PagePermission> TogglePagepermissionAsync(string type, bool value, int id);
        public  Task<PagePermission> CreatePagepermsissonAsync(int rolemappingId, int roleId);
        public  Task<CreatePagePermissionDTO> UpdatePagePermissionAsync(CreatePagePermissionDTO createPagePermissionDTO);

    }
}
