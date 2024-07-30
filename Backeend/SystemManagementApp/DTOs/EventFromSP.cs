namespace SystemManagementApp.DTOs
{
    public class EventFromSP
    {
        public int id { get; set; }
        public int exact_count { get; set; }
        public string eventDescription { get; set; }
        public int eventdescriptionid { get; set; }
        public int priority { get; set; }
        public string priorityname { get; set; }
        public string datetime { get; set; }
        public int eventId { get; set; }
        public int eventtype { get; set; }
        public string eventtypename { get; set; }
        public int devicetypeid { get; set; }
        public string devicetypename { get; set; }
        public int actionid { get; set; }
        public string actionbyname { get; set; }
        public int plantid { get; set; }
        public string plantname { get; set; }

    }
}
