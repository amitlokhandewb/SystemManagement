namespace SystemManagementApp.Model
{
    public class RoleMapping
    {
        public int Id { get; set; }
        public int roleId { get; set; }
        public int pageNo { get; set; }
        public string pageName { get; set; }
        public bool view {  get; set; }
        public bool modify {  get; set; }


    }
}
