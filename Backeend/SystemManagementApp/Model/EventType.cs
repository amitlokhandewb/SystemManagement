using System.Diagnostics.CodeAnalysis;

namespace SystemManagementApp.Model
{
    [ExcludeFromCodeCoverage]
    public class EventType
    {
        public int eventTypeId {  get; set; }
        public string eventTypeName { get; set; }
    }
}
