using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace SystemManagementApp.Model
{
    [ExcludeFromCodeCoverage]
    public class PlantName
    {
        [Key]
        public int plantId { get; set; }
        public string plantName { get; set;}
    }
}
