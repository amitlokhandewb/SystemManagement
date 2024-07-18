using System.ComponentModel.DataAnnotations.Schema;

namespace SystemManagementApp.Model
{
    public class EndUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        [ForeignKey("UserRoles")]
        public int RoleId { get; set; }
        public virtual UserRole Role { get; set; }
        public Boolean IsActive { get; set; }
    }
}
