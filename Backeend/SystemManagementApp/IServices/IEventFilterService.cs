using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IEventFilterService
    {
        public  Task<object> GetFilterData(FilterDto filterDTO, int page, int pageLimit);
        public  Task<object> GetFilterDataBySP(FilterDto filterDTO, int page, int pageLimit);

    }
}
