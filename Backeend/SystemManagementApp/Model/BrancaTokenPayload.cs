using System.Diagnostics.CodeAnalysis;

namespace SystemManagementApp.Model
{
    [ExcludeFromCodeCoverage]
    public class BrancaTokenPayload
    {
        public string Email { get; set; }
        public DateTime IssuedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
