using System.ComponentModel.DataAnnotations.Schema;

namespace SystemManagementApp.Model
{
    public class PagePermission
    {
        public int id { get; set; }
        [ForeignKey("RoleMapping")]
        public int rolemappingId { get; set; }
        public virtual RoleMapping RoleMapping { get; set; }
        [ForeignKey("UserRole")]
        public int roleId { get; set; }
        public virtual UserRole UserRole { get; set; }

        public bool view {  get; set; }
        public bool modify { get; set; }
    }
}
