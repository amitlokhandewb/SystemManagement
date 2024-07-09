﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class EventService
    {
        private readonly EventRepository _eventRepository;
        private readonly CommonService _commonService;
        private readonly Random _random;

        public EventService(EventRepository eventRepository, CommonService commonService)
        {
            _eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
            _commonService = commonService ?? throw new ArgumentNullException(nameof(commonService));
            _random = new Random();
        }

        public async Task<IEnumerable<Events>> GetEventsAsync()
        {
            return await _eventRepository.GetEvents();
        }

        public async Task<Events> GetEventsById(int id)
        {
            return await _eventRepository.GetEventById(id);
        }

        public async Task<Events> CreateEvents(Events events)
        {
            return await _eventRepository.CreateEvent(events);
        }

        public async Task<bool> DeleteEvents(int id)
        {
            return await _eventRepository.DeleteEvent(id);
        }

        public async Task<Events> CreateRandomEventAsync()
        {
            var eventDescriptions = await _commonService.GetEventDescriptions();
            var priorities = await _commonService.GetPrioritiesAsync();
            var eventTypes = await _commonService.GetEventTypes();
            var deviceTypes = await _commonService.GetDeviceTypes();
            var actionBies = await _commonService.GetActionBies();
            var plantNames = await _commonService.GetPlantNames();

            var newEvent = new Events
            {
                eventDescription = GetRandomItem(eventDescriptions)?.eventDescription ?? "N/A",
                priority = GetRandomItem(priorities)?.priorityId ?? 0,
                dateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                eventid = GenerateRandomId(),
                eventType = GetRandomItem(eventTypes)?.eventTypeName ?? "N/A",
                deviceType = GetRandomItem(deviceTypes)?.deviceName ?? "N/A",
                actionBy = GetRandomItem(actionBies)?.actionName ?? "N/A",
                plantName = GetRandomItem(plantNames)?.plantName ?? "N/A"
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
