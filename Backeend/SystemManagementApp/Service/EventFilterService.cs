using Microsoft.AspNetCore.Mvc.RazorPages;
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
        public async Task<object> GetFilterData(FilterDto filterDTO, int page, int pageLimit)
        {
            if (page == 0)
                page = 1;
            if (pageLimit == 0)
                pageLimit = int.MaxValue;

            var events = await _eventRepository.GetEvents();
            

           

            if (filterDTO.priority > 0)
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

            var totalEvents = events.Count();
            if (totalEvents == 0)
            {
                throw new Exception("No Content Found");
            }
            var maxPageLimit = (int)Math.Ceiling((double)totalEvents / pageLimit);
            var skip = (page - 1) * pageLimit;
            var paginated = events.Skip(skip).Take(pageLimit);
            var paginatedwithpagelimit = new
            {
                count = maxPageLimit,
                pagonatedData = paginated
            };

            if (page > maxPageLimit)
            {
                throw new ArgumentOutOfRangeException(nameof(page), $"Page number {page} exceeds maximum available pages ({maxPageLimit}).");
            }
            return paginatedwithpagelimit;

        }
    }
}
