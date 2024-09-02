using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using System.Security;
using SystemManagementApp.DTOs;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class RoleMappingService
    {
        private readonly RoleMappingRepository _roleMappingRepository;
        private readonly IConfiguration _configuration;
       
        public RoleMappingService(RoleMappingRepository roleMappingRepository, IConfiguration configuration)
        {
            _roleMappingRepository = roleMappingRepository;
            _configuration = configuration;
        }
        private IDbConnection CreateConnection()
        {
            return new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
        public async Task<IEnumerable<RoleMapping>> GetRoleMapListAsync()
        {
            return await _roleMappingRepository.GetRoleMappingListAsync();
        }
        public async Task<RoleMapping> GetRoleMapByIdAsync(int id)
        {
            return await _roleMappingRepository.GetRoleMapByIdAsync(id);
        }
        public async Task<IEnumerable<RoleMapping>> GetRoleMapByParentAsync()
        {
            return await _roleMappingRepository.GetRoleMapByParentAsync();
        }
        public async Task<RoleMapping> GetRoleMapByPageNameAsync(string pageName)
        {
            return await _roleMappingRepository.GetRoleMapByPageNameAsync(pageName);
        }
        public async Task<RoleMapping> CreateRoleMappingAsync(RoleMapping roleMapping)
        {
            return await _roleMappingRepository.CreateRoleMapping(roleMapping);
        }
        public async Task<RoleMapping> UpdateRoleMappingAsync(RoleMapping roleMapping, int id)
        {
            return await _roleMappingRepository.UpdateRoleMapping(roleMapping, id);
        } 
        public async Task<bool> DeleteRoleMappingAsync(int id)
        {
            return await _roleMappingRepository.DeleteRoleMapping(id);
        }
        public async Task<object> GetAccesByRoleId(int roleId)
        {
            var parameters = new { roleId = roleId };
            using (var connection = CreateConnection())
            {
                var sql = "SELECT * FROM get_role_permissions(@roleId)";
                var response = (await connection.QueryAsync<PermissionDTO>(sql, parameters)).ToList();

                var lookup = response.ToLookup(x => x.ParentId);
                var rootItems = response.Where(x => x.ParentId == 0).ToList();

                var result = BuildHierarchy(rootItems, lookup);
                return result;
            }
        }public async Task<object> GetAccesByRoleforId(int roleId)
        {
            var parameters = new { roleId = roleId };
            using (var connection = CreateConnection())
            {
                var sql = "SELECT * FROM get_role_permissions(@roleId)";
                var response = (await connection.QueryAsync<PermissionDTO>(sql, parameters)).ToList();
                return response;
            }
        }


        private static object BuildHierarchy(List<PermissionDTO> items, ILookup<int, PermissionDTO> lookup)
        {
            return items.Select(item => new
            {
                Id = item.Id,
                PermissionId = item.PermissionId,
                ParentId = item.ParentId,
                View = item.View,
                Modify = item.Modify,
                RoleId = item.RoleId,
                PageName = item.PageName,
                Children = BuildHierarchy(lookup[item.Id].ToList(), lookup)
            }).ToList();
        }

    }
}
