namespace SystemManagementApp.DTOs
{
    public class PermissionDTO
    {
        public int Id { get; set; }
        public int PermissionId { get; set; }
        public int ParentId { get; set; }
        public bool View { get; set; }
        public bool Modify { get; set; }
        public int RoleId { get; set; }
        public string PageName { get; set; }
    }
}
