using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(AuthorizeTokenAttribute))]
    public class PlantNameConrroller : ControllerBase
    {
        private readonly PlantNameService _plantNameService;

        public PlantNameConrroller(PlantNameService plantNameService)
        {
            _plantNameService = plantNameService;
        }
        [HttpGet("GetPLantNamesAsync")]
        public async Task<ActionResult<IEnumerable<PlantName>>> GetPLantNamesAsync()
        {
            var response = await _plantNameService.GetPlantNameAsync();
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost("CreatePlantNameAsycn")]
        public async Task<ActionResult<PlantName>> CreatePlantNameAsycn(PlantName plantName)
        {
            var response = await _plantNameService.CreatePlantNameAsync(plantName);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPut("UpdatePlantNameAsync/{id}")]
        public async Task<ActionResult<PlantName>> UpdatePlantNameAsync(PlantName plantName, int id)
        {
            var response = await _plantNameService.UpdatePlantNameAsync(plantName, id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpDelete("DeletePlantNameAsync/{id}")]
        public async Task<ActionResult<Boolean>> DeletePlantNameAsync(int id)
        {
            var response = await _plantNameService.DeletePlantNameAsync(id);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
