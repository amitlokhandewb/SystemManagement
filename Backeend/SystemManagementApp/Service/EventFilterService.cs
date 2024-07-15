using Microsoft.AspNetCore.Mvc.RazorPages;
using SystemManagementApp.DTOs;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventFilterService
    {
        private readonly EventRepository _eventRepository;
        private readonly DeviceTypeService _deviceTypeService;
        private readonly EventDescriptionService _eventDescriptionService;
        private readonly EventTypeService _eventTypeService;
        private readonly PriorityService _priorityService;
        private readonly PlantNameService _plantNameService;
        private readonly UserService _userService;
        public EventFilterService(EventRepository eventRepository, DeviceTypeService deviceTypeService, EventDescriptionService eventDescriptionService, EventTypeService eventTypeService, PriorityService priorityService, PlantNameService plantNameService, UserService userService)
        {
            _eventRepository = eventRepository;
            _deviceTypeService = deviceTypeService;
            _eventDescriptionService = eventDescriptionService;
            _eventTypeService = eventTypeService;
            _priorityService = priorityService;
            _plantNameService = plantNameService;
            _userService = userService;

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
                events = events.Where(x => x.priorityId ==  filterDTO.priority);
            }
            if(filterDTO.eventId > 0)
            {
                events = events.Where(x => x.eventid == filterDTO.eventId);
            }
            if(filterDTO.deviceType > 0)
            {
                events = events.Where(x => x.deviceTypeId == filterDTO.deviceType);
            }
            if (filterDTO.eventType > 0)
            {
                events = events.Where(x => x.eventTypeId == filterDTO.eventType);
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
            var paginatedwithnames = new List<GetEventDTO>();
            foreach(var ev in paginated)
            {
                var deviceType = await _deviceTypeService.GetDeviceTypeByIdAsync(ev.deviceTypeId);
                var eventDescriptions = await _eventDescriptionService.GetEventDescriptionByIdAsync(ev.eventDescriptionId);
                var priorities = await _priorityService.GetPriorityByIdAsync(ev.priorityId);
                var eventTypes = await _eventTypeService.GetEventTypeByIdAsync(ev.eventTypeId);
                var users = await _userService.GetUsersByIdAsync(ev.actionById);
                var plantnames = await _plantNameService.GetPlantNameByIDAsync(ev.plantId);

                var getEventDTO = new GetEventDTO
                {
                    id = ev.id,
                    eventDescription = eventDescriptions?.eventDescription ?? "unknown",
                    eventDescriptionId = ev.eventDescriptionId,
                    priority = ev.priorityId,
                    priorityName = priorities?.priorityName ?? "Unknown",
                    dateTime = ev.dateTime,
                    eventid = ev.eventid,
                    eventType = ev.eventTypeId,
                    eventTypeName = eventTypes?.eventTypeName ?? "unknown",
                    deviceTypeId = ev.deviceTypeId,
                    deviceTypeName = deviceType?.deviceName ?? "Unknown",
                    actionId = ev.actionById,
                    actionByName = users?.actionName ?? "Unknown",
                    plantId = ev.plantId,
                    plantNames = plantnames?.plantName ?? "Unknown",

                };
                paginatedwithnames.Add(getEventDTO);
            }
            var paginatedwithpagelimit = new
            {
                count = maxPageLimit,
                pagonatedData = paginatedwithnames
            };

            if (page > maxPageLimit)
            {
                throw new ArgumentOutOfRangeException(nameof(page), $"Page number {page} exceeds maximum available pages ({maxPageLimit}).");
            }
            return paginatedwithpagelimit;

        }
    }
}
