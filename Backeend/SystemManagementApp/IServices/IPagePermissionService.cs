using SystemManagementApp.DTOs;
using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IPagePermissionService
    {
        public  Task<PagePermission> GetPagepermissionByIdAsync(int id);
        public  Task<CreatePagePermissionDTO> CreatePagepermsissonAsync(int rolemappingid);
        public  Task<PagePermission> TogglePagepermissionAsync(string type, bool value, int id);
    }
}
