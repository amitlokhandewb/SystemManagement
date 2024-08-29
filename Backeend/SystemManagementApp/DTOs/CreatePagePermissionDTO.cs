namespace SystemManagementApp.DTOs
{
    public class CreatePagePermissionDTO
    {
        public int roleMappingId { get; set; }
        public int roleId { get; set; }
        public bool view {  get; set; }
        public bool modify { get; set; }
    }
}
