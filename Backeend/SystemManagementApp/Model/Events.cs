using System.ComponentModel.DataAnnotations.Schema;

namespace SystemManagementApp.Model
{
    public class Events
    {
        public int id { get; set; }
        [ForeignKey("EventDescription")]
        public int eventDescriptionId { get; set; }
        public virtual EventDescription EventDescription { get; set; }
        [ForeignKey("Priorities")]
        public int priorityId { get; set; }
        public virtual Priority priority { get; set; }
        public string dateTime { get; set; }
        public int eventid { get; set; }
        [ForeignKey("EventTypes")]
        public int eventTypeId { get; set; }
        public virtual EventType eventType { get; set; }

        [ForeignKey("DeviceTypes")]
        public int  deviceTypeId { get; set; }
        public virtual DeviceType DeviceType { get; set; }
        [ForeignKey("ActionBies")]
        public int actionById { get; set; }
        public virtual ActionBy ActionBy { get; set; }
        [ForeignKey("PlantName")]
        public int plantId { get; set; }
        public virtual PlantName PlantName { get; set; }


    }
}
