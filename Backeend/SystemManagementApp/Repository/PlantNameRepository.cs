using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Model;

namespace SystemManagementApp.Repository
{
    public class PlantNameRepository
    {
        private readonly AppDbContext _context;

        public PlantNameRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PlantName>> GetPlantNameAsync()
        {
            return await _context.PlantName.ToListAsync();
        }
        public async Task<PlantName> CreatePlantName(PlantName plantName)
        {
            var existingPlantNamee = await _context.PlantName.FindAsync(plantName.plantId);
            if (existingPlantNamee != null)
            {
                throw new InvalidOperationException($"A device type with ID {plantName.plantId} already exists.");
            }
            _context.PlantName.Add(plantName);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException("An error occurred while saving the plantName .", ex);
            }

            return plantName;
        }
        public async Task<PlantName> UpdatePlantName(PlantName plantName, int id)
        {
            var PlantNameexist = await _context.PlantName.FirstOrDefaultAsync(x => x.plantId == id);
            if (PlantNameexist != null)
            {
                PlantNameexist.plantName = plantName.plantName;
                await _context.SaveChangesAsync();
                return PlantNameexist;
            }
            return plantName;
        }
        public async Task<Boolean> DeletePlantName(int id)
        {
            var PlantNameexist = await _context.PlantName.FirstOrDefaultAsync(x => x.plantId == id);
            if (PlantNameexist != null)
            {
                _context.PlantName.Remove(PlantNameexist);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
