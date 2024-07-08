using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Model;

namespace SystemManagementApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Events> Events { get; set; }
    }
}
