namespace SystemManagementApp.Model
{
    public class FilterDto
    {
        public int priority { get; set; }
        public int deviceType { get; set; }
        public int eventType { get; set; }
        public int eventId { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
    }
}
