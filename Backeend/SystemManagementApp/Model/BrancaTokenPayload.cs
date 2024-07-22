namespace SystemManagementApp.Model
{
    public class BrancaTokenPayload
    {
        public string Username { get; set; }
        public DateTime IssuedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
