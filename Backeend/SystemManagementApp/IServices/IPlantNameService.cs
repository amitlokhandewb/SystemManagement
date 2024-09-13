using SystemManagementApp.Model;

namespace SystemManagementApp.IServices
{
    public interface IPlantNameService
    {
        public  Task<IEnumerable<PlantName>> GetPlantNameAsync();
        public  Task<PlantName> GetPlantNameByIDAsync(int id);
        public  Task<PlantName> GetPlantNameByNameAsync(string plantname);
        public  Task<PlantName> CreatePlantNameAsync(PlantName plantName);
        public  Task<PlantName> UpdatePlantNameAsync(PlantName plantName, int id);
        public  Task<Boolean> DeletePlantNameAsync(int id);

    }
}
