using SystemManagementApp.Model;
using SystemManagementApp.Repository;

namespace SystemManagementApp.Service
{
    public class PlantNameService
    {
        private readonly PlantNameRepository _repository;

        public PlantNameService(PlantNameRepository plantNameRepository)
        {
            _repository = plantNameRepository;
        }
        public async Task<IEnumerable<PlantName>> GetPlantNameAsync()
        {
            return await _repository.GetPlantNameAsync();
        } 
        public async Task<PlantName> GetPlantNameByIDAsync(int id)
        {
            return await _repository.GetPlantNameByIDAsync(id);
        }
        public async Task<PlantName> CreatePlantNameAsync(PlantName plantName)
        {
            return await _repository.CreatePlantName(plantName);
        }
        public async Task<PlantName> UpdatePlantNameAsync(PlantName plantName, int id)
        {
            return await _repository.UpdatePlantName(plantName, id);
        }
        public async Task<Boolean> DeletePlantNameAsync(int id)
        {
            return await _repository.DeletePlantName(id);
        }
    }
}
