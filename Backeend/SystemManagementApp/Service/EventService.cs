using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SystemManagementApp.DTOs;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventService
    {
        private readonly EventRepository _eventRepository;
        private readonly Random _random;
        private readonly DeviceTypeService _deviceTypeService;
        private readonly EventDescriptionService _eventDescriptionService;
        private readonly EventTypeService _eventTypeService;
        private readonly PriorityService _priorityService;
        private readonly PlantNameService _plantNameService;
        private readonly UserService _userService;

        public EventService(EventRepository eventRepository, DeviceTypeService deviceTypeService, EventDescriptionService eventDescriptionService, EventTypeService eventTypeService, PriorityService priorityService, PlantNameService plantNameService, UserService userService)
        {
            _eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
            _deviceTypeService = deviceTypeService;
            _eventDescriptionService = eventDescriptionService;
            _eventTypeService = eventTypeService;
            _priorityService = priorityService;
            _plantNameService = plantNameService;
            _userService = userService;
            _random = new Random();
        }

        public async Task<object> GetEventsAsync(int page, int pageLimit)
        {
            try
            {
                if (page == 0) page = 1;
                if (pageLimit == 0) pageLimit = int.MaxValue;

                var events = await _eventRepository.GetEvents();
                var totalEvents = events.Count();

                if (totalEvents == 0)
                {
                    throw new Exception("No Content Found");
                }

                var maxPageLimit = (int)Math.Ceiling((double)totalEvents / pageLimit);
                if (page > maxPageLimit)
                {
                    throw new ArgumentOutOfRangeException(nameof(page), $"Page number {page} exceeds maximum available pages ({maxPageLimit}).");
                }

                var skip = (page - 1) * pageLimit;
                var paginatedEvents = events.Skip(skip).Take(pageLimit).ToList();

                var paginatedWithDeviceTypeName = new List<GetEventDTO>();
                foreach (var ev in paginatedEvents)
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
                    paginatedWithDeviceTypeName.Add(getEventDTO);
                }

                var response = new
                {
                    count = maxPageLimit,
                    paginatedData = paginatedWithDeviceTypeName
                };

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving events.", ex);
            }
        }

        public async Task<Events> GetEventsById(int id)
        {
            return await _eventRepository.GetEventById(id);
        }

        public async Task<Events> CreateEvents(CreateEventDTO events)
        {
            return await _eventRepository.CreateEvent(events);
        }

        public async Task<bool> DeleteEvents(int id)
        {
            return await _eventRepository.DeleteEvent(id);
        }

        public async Task<Events> CreateRandomEventAsync()
        {
            var eventDescriptions = await _eventDescriptionService.GetEventDescriptionsAsync();
            var priorities = await _priorityService.GetPrioritiesAsync();
            var eventTypes = await _eventTypeService.GetEventTypesAsync();
            var deviceTypes = await _deviceTypeService.GetDeviceTypesAsync();
            var actionBies = await _userService.GetUsersAsync();
            var plantNames = await _plantNameService.GetPlantNameAsync();

            if (eventDescriptions == null || priorities == null || eventTypes == null || deviceTypes == null || actionBies == null || plantNames == null)
            {
                throw new NullReferenceException("One of the service calls returned null");
            }

            var newEvent = new CreateEventDTO
            {
                eventDescription = GetRandomItem(eventDescriptions)?.eventDescriptionId ?? 0,
                priority = GetRandomItem(priorities)?.priorityId ?? 0,
                dateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                eventid = GenerateRandomId(),
                eventType = GetRandomItem(eventTypes)?.eventTypeId ?? 0,
                deviceTypeId = GetRandomItem(deviceTypes)?.deviceTypeId ?? 0,
                actionBy = GetRandomItem(actionBies)?.actionById ?? 0,
                plantId = GetRandomItem(plantNames)?.plantId ?? 0,
            };

            return await CreateEvents(newEvent);
        }

        private T GetRandomItem<T>(IEnumerable<T> items) where T : class
        {
            if (items == null || !items.Any())
                return null;

            var list = items.ToList();
            var randomIndex = _random.Next(list.Count);
            return list[randomIndex];
        }

        private int GenerateRandomId()
        {
            return _random.Next(100, 1000); // Generate random integer ID between 100 and 999
        }
    }
}
