using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class DeviceTypeService
    {
        private readonly DeviceTypeRepository _repository;

        public DeviceTypeService(DeviceTypeRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<DeviceType>> GetDeviceTypesAsync()
        {
            return await _repository.GetDeviceTypesAsync();
        }
        public async Task<DeviceType> CreateDeviceTypeAsync(DeviceType deviceType)
        {
            return await _repository.CreateDeviceType(deviceType);
        }
        public async Task<DeviceType> UpdateDeviceTypeAsync(DeviceType deviceType, int id)
        {
            return await _repository.UpdateDeviceType(deviceType, id);
        }
        public async Task<Boolean> DeleteDeviceTypeAsync(int id)
        {
            return await _repository.DeleteDeviceType(id);
        }
    }
}
