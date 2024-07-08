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
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<EventType> EventTypes { get; set; }
        public DbSet<DeviceType> DeviceTypes { get; set; }
        public DbSet<PlantName> PlantName { get; set; }
        public DbSet<EventDescription> EventDescription { get; set; }
        public DbSet<ActionBy> ActionBies { get; set; }

    }
}
