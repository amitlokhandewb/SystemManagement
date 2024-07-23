namespace SystemManagementApp.Model
{
    public class BrancaTokenPayload
    {
        public string Email { get; set; }
        public DateTime IssuedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
