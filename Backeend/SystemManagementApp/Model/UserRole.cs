using System.Diagnostics.CodeAnalysis;

namespace SystemManagementApp.Model
{
    [ExcludeFromCodeCoverage]
    public class UserRole
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
    }
}
