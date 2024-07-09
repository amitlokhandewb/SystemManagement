namespace SystemManagementApp.Model
{
    public class EventDto
    {
        public int EventId { get; set; }
        public string EventDescription { get; set; }
        public int Priority { get; set; }
        public string DateTime { get; set; }
        public string EventType { get; set; }
        public string DeviceType { get; set; }
        public string DeviceTypeName { get; set; }
        public string ActionBy { get; set; }
        public string PlantName { get; set; }
    }
}
