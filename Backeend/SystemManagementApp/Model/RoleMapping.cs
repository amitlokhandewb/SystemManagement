using System.Diagnostics.CodeAnalysis;

namespace SystemManagementApp.Model
{
    [ExcludeFromCodeCoverage]
    public class RoleMapping
    {
        public int Id { get; set; }
        public int parentId { get; set; }
        public string pageName { get; set; }

    }
}
