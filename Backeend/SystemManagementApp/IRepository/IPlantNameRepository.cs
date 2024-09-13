using SystemManagementApp.Model;

namespace SystemManagementApp.IRepository
{
    public interface IPlantNameRepository
    {
        public  Task<IEnumerable<PlantName>> GetPlantNameAsync();
        public  Task<PlantName> GetPlantNameByIDAsync(int id);
        public  Task<PlantName> GetPlantNameByNameAsync(string plantname);
        public  Task<PlantName> CreatePlantName(PlantName plantName);
        public  Task<PlantName> UpdatePlantName(PlantName plantName, int id);
        public  Task<Boolean> DeletePlantName(int id);

    }
}
