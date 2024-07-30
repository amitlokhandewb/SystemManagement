using Dapper;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Any;
using Newtonsoft.Json;
using Npgsql;
using System.Data;
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
        private readonly IConfiguration _configuration;
        public EventFilterService(EventRepository eventRepository, DeviceTypeService deviceTypeService, EventDescriptionService eventDescriptionService, EventTypeService eventTypeService, PriorityService priorityService, PlantNameService plantNameService, UserService userService, IConfiguration configuration)
        {
            _eventRepository = eventRepository;
            _deviceTypeService = deviceTypeService;
            _eventDescriptionService = eventDescriptionService;
            _eventTypeService = eventTypeService;
            _priorityService = priorityService;
            _plantNameService = plantNameService;
            _userService = userService;
            _configuration = configuration;
        }
        private IDbConnection CreateConnection()
        {
            return new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
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
        public async Task<object> GetFilterDataBySP(FilterDto filterDTO, int page, int pageLimit)
        {
            if (filterDTO == null)
                throw new ArgumentNullException(nameof(filterDTO));

            if (page <= 0)
                page = 1;
            if (pageLimit <= 0)
                pageLimit = int.MaxValue;

            var parameters = new
            {
                p_priority = filterDTO.priority == 0 ? (int?)null : filterDTO.priority,
                p_eventId = filterDTO.eventId == 0 ? (int?)null : filterDTO.eventId,
                p_deviceType = filterDTO.deviceType == 0 ? (int?)null : filterDTO.deviceType,
                p_eventType = filterDTO.eventType == 0 ? (int?)null : filterDTO.eventType,
                p_startDate = string.IsNullOrWhiteSpace(filterDTO.startDate) ? null : filterDTO.startDate,
                p_endDate = string.IsNullOrWhiteSpace(filterDTO.endDate) ? null : filterDTO.endDate,
                p_page = page,
                p_pageLimit = pageLimit
            };

            using (var connection = CreateConnection())
            {
                var sql = "SELECT * FROM GetFilteredAndEnrichedEvents(@p_priority, @p_eventId, @p_deviceType, @p_eventType, @p_startDate, @p_endDate, @p_page, @p_pageLimit)";
                var response = await connection.QueryAsync<EventFromSP>(sql, parameters);

                var hasResults = response.Any();
                var totalcount = hasResults ? response.First().exact_count : 0;
                var maxPageLimit = (int)Math.Ceiling((double)totalcount / pageLimit);
                var mappingdata = response.Select(res => new GetEventDTO
                {
                    id = res.id,
                    eventDescription = res.eventDescription,
                    eventDescriptionId = res.eventdescriptionid,
                    priority = res.priority,
                    priorityName = res.priorityname,
                    dateTime = res.datetime,
                    eventid = res.eventId,
                    eventType = res.eventtype,
                    eventTypeName = res.eventtypename,
                    deviceTypeId = res.devicetypeid,
                    deviceTypeName = res.devicetypename,
                    actionId = res.actionid,
                    actionByName = res.actionbyname,
                    plantId = res.plantid,
                    plantNames = res.plantname

                }).ToList();

                var Output = new
                {
                    count = maxPageLimit,
                    pagonatedData = mappingdata
                };


                return Output;
            }
        }



    }
}
