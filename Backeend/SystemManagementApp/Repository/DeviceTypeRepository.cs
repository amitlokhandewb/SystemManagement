using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class DeviceTypeRepository
    {
        private readonly AppDbContext _context;

        public DeviceTypeRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<DeviceType>> GetDeviceTypesAsync()
        {
            return await _context.DeviceTypes.ToListAsync();
        }
        public async Task<DeviceType> CreateDeviceType(DeviceType deviceType)
        {
  
            var existingDeviceType = await _context.DeviceTypes.FindAsync(deviceType.deviceTypeId);
            if (existingDeviceType != null)
            {
                throw new InvalidOperationException($"A device type with ID {deviceType.deviceTypeId} already exists.");
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
