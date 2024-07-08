using System.ComponentModel.DataAnnotations;

namespace SystemManagementApp.Model
{
    public class PlantName
    {
        [Key]
        public int plantId { get; set; }
        public string plantName { get; set;}
    }
}
