using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IDeviceTypeService
    {
        public  Task<IEnumerable<DeviceType>> GetDeviceTypesAsync();
        public  Task<DeviceType> GetDeviceTypeByIdAsync(int id);
        public  Task<DeviceType> GetDeviceTypeByNameAsync(string devicetype);
        public  Task<DeviceType> CreateDeviceTypeAsync(DeviceType deviceType);
        public  Task<DeviceType> UpdateDeviceTypeAsync(DeviceType deviceType, int id);
        public  Task<Boolean> DeleteDeviceTypeAsync(int id);

    }
}
