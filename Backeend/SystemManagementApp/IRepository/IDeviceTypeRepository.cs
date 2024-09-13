using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IDeviceTypeRepository
    {
        public Task<IEnumerable<DeviceType>> GetDeviceTypesAsync();
        public Task<DeviceType> GetDeviceTypeByIDAsync(int id);
        public Task<DeviceType> CreateDeviceType(DeviceType deviceType);
        public Task<DeviceType> GetDeviceTypebyNameAsync(string deviceTypeName);
        public Task<DeviceType> UpdateDeviceType(DeviceType deviceType, int id);
        public Task<Boolean> DeleteDeviceType(int id);

    }
}
