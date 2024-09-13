using SystemManagementApp.DTOs;
using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class PagePermissionService: IPagePermissionService
    {
        private readonly IPagePermissionRepository _pagePerissionRepository;
        private readonly IRoleRepository _roleRepository;

        public PagePermissionService(IPagePermissionRepository pagePerissionRepository, IRoleRepository roleRepository)
        {
            _pagePerissionRepository = pagePerissionRepository;
            _roleRepository = roleRepository;
        }
        public async Task<PagePermission> GetPagepermissionByIdAsync(int id)
        {
            return await _pagePerissionRepository.GetPagepermissionByIdAsync(id);
        }
        public async Task<CreatePagePermissionDTO> CreatePagepermsissonAsync(int rolemappingid)
        {
            var roles = await _roleRepository.GetRolesAsync();
            foreach (var role in roles)
            {
                var roleid = role.Id;
                await _pagePerissionRepository.CreatePagepermsissonAsync(rolemappingid, roleid);

            }
            return new CreatePagePermissionDTO { roleMappingId = rolemappingid };

        }
        public async Task<PagePermission> TogglePagepermissionAsync(string type, bool value, int id)
        {
           return await _pagePerissionRepository.TogglePagepermissionAsync(type, value, id);
        }
    }
}
