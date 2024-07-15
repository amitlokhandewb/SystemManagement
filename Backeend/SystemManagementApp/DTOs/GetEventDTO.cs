namespace SystemManagementApp.DTOs
{
    public class GetEventDTO
    {
        public int id { get; set; }
        public int eventDescriptionId { get; set; }
        public string eventDescription { get; set; }
        public int priority { get; set; }
        public string priorityName { get; set; }
        public string dateTime { get; set; }
        public int eventid { get; set; }
        public int eventType { get; set; }
        public string eventTypeName { get; set; }
        public int deviceTypeId { get; set; }
        public string deviceTypeName { get; set; }
        public int actionId { get; set; }
        public string actionByName { get; set; }
        public int plantId { get; set; }
        public string plantNames { get; set; }
    }
}

