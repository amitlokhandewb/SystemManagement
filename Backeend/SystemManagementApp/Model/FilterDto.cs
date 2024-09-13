using System.Diagnostics.CodeAnalysis;

namespace SystemManagementApp.Model
{
    [ExcludeFromCodeCoverage]
    public class FilterDto
    {
        public int priority { get; set; }
        public int deviceType { get; set; }
        public int eventType { get; set; }
        public int eventId { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string sortKey { get; set; }
        public string sortOrder { get; set; }
    }
}
