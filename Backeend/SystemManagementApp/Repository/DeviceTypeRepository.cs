using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class DeviceTypeRepository
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public DeviceTypeRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        private IDbConnection CreateConnection()
        {
            return new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
        public async Task<IEnumerable<DeviceType>> GetDeviceTypesAsync()
        {
            return await _context.DeviceTypes.ToListAsync();
        }
        public async Task<DeviceType> GetDeviceTypeByIDAsync(int id)
        {
            var parameters = new { p_id = id };
            using (var connection = CreateConnection())
            {
                var sql = "SELECT * FROM GetDeviceTypeByID(@p_id)";
                return await connection.QueryFirstOrDefaultAsync<DeviceType>(sql, parameters);
            }
        }
        public async Task<DeviceType> CreateDeviceType(DeviceType deviceType)
        {
  
            var existingDeviceType = await _context.DeviceTypes.FirstOrDefaultAsync(x => x.deviceName == deviceType.deviceName);
            if (existingDeviceType != null)
            {
                throw new InvalidOperationException($"A device type with ID {deviceType.deviceName} already exists.");
            }
            _context.DeviceTypes.Add(deviceType);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the device type.", ex);
            }

            return deviceType;
        }

        public async Task<DeviceType> UpdateDeviceType(DeviceType deviceType, int id)
        {
            var deviceTypeexist = await _context.DeviceTypes.FirstOrDefaultAsync(x => x.deviceTypeId == id);
            if (deviceTypeexist != null)
            {
                deviceTypeexist.deviceName = deviceType.deviceName;
                await _context.SaveChangesAsync();
                return deviceTypeexist;
            }
            return deviceType;
        }
        public async Task<Boolean> DeleteDeviceType(int id)
        {
            var deviceTypeexist = await _context.DeviceTypes.FirstOrDefaultAsync(x => x.deviceTypeId == id);
            if (deviceTypeexist != null)
            {
                _context.DeviceTypes.Remove(deviceTypeexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
