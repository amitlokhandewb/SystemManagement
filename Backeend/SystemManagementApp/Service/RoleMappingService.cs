using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
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
                var response = await connection.QueryAsync(sql, parameters);
                return response;
            }

        }
    }
}
