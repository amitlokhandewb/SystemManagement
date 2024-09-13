using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using SystemManagementApp.Model;

namespace SystemManagementApp.DTOs
{
    [ExcludeFromCodeCoverage]
    public class CreateEndUser
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
    }
}
