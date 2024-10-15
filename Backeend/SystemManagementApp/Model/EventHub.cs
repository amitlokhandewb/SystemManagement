using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using SystemManagementApp.IServices;

namespace SystemManagementApp.Model
{
    public class EventHub: Hub
    {
        private readonly IEventService _eventService;

        public EventHub(IEventService eventService)
        {
            _eventService = eventService;
        }

        public async Task CreateRandomEventAsync(int pageNo, int pageLimit)
        {
            var newEvent = await _eventService.CreateRandomEventAsync();
            await SendUpdatedEventList(pageNo, pageLimit);
        }
        public async Task SendUpdatedEventList(int pageNo, int pageLimit)
        {
            var events = await _eventService.GetEventsAsync(pageNo, pageLimit); 
            await Clients.All.SendAsync("ReceiveEventList", events); 
        }

    }
}
