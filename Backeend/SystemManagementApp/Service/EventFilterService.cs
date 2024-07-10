using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventFilterService
    {
        private readonly EventRepository _eventRepository;

        public EventFilterService(EventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }
        public async Task<IEnumerable<Events>> GetFilterData(FilterDto filterDTO)
        {
            var events = await _eventRepository.GetEvents();

            if(filterDTO.priority > 0)
            {
                events = events.Where(x => x.priority ==  filterDTO.priority);
            }
            if(filterDTO.eventId > 0)
            {
                events = events.Where(x => x.eventid == filterDTO.eventId);
            }
            if(!string.IsNullOrEmpty(filterDTO.deviceType))
            {
                events = events.Where(x => x.deviceType == filterDTO.deviceType);
            }
            if (!string.IsNullOrEmpty(filterDTO.eventType))
            {
                events = events.Where(x => x.eventType == filterDTO.eventType);
            }
            if (!string.IsNullOrEmpty(filterDTO.startDate) && !string.IsNullOrEmpty(filterDTO.endDate))
            {
                DateTime startDate = DateTime.Parse(filterDTO.startDate);
                DateTime endDate = DateTime.Parse(filterDTO.endDate);
                events = events.Where(x => DateTime.TryParse(x.dateTime, out var eventDate) && eventDate >= startDate && eventDate <= endDate);
            }
            return events;

        }
    }
}
