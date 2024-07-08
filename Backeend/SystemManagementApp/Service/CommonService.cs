using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class CommonService
    {
        private readonly CommonRepository _commonrepository;

        public CommonService(CommonRepository commonRepository)
        {
            _commonrepository = commonRepository;
        }
        public async Task<IEnumerable<Priority>> GetPrioritiesAsync()
        {
            return await _commonrepository.GetPriorities();
        }  
        public async Task<IEnumerable<EventType>> GetEventTypes()
        {
            return await _commonrepository.GetEventTypes();
        }  
        public async Task<IEnumerable<DeviceType>> GetDeviceTypes()
        {
            return await _commonrepository.GetDeviceType();
        }  
        public async Task<IEnumerable<PlantName>> GetPlantNames()
        {
            return await _commonrepository.GetPlantNames();
        }  
        public async Task<IEnumerable<ActionBy>> GetActionBies()
        {
            return await _commonrepository.GetActionBies();
        }  
        public async Task<IEnumerable<EventDescription>> GetEventDescriptions()
        {
            return await _commonrepository.GetEventDescriptions();
        }  
    }
}
