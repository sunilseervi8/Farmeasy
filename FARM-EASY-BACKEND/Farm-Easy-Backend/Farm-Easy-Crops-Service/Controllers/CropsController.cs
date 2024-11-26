using LMS_User_Service.Data;
using LMS_User_Service.IRepository;
using LMS_User_Service.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace LMS_User_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropsController : ControllerBase
    {
        
            private readonly CropIRepository _cropRepository;

            public CropsController(CropIRepository cropRepository)
            {
                _cropRepository = cropRepository;
            }

            [HttpGet]
            public IActionResult GetAllCrops()
            {
                return Ok(_cropRepository.GetAllCrops());
            }

            [HttpGet("{id}")]
            public IActionResult GetCropById(int id)
            {
                var crop = _cropRepository.GetCropById(id);
                if (crop == null) return NotFound();
                return Ok(crop);
            }

            [HttpGet("category/{category}")]
            public IActionResult GetCropsByCategory(string category)
            {
                return Ok(_cropRepository.GetCropsByCategory(category));
            }

            [HttpPost]
            public IActionResult AddCrop( Crop crop)
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var createdCrop = _cropRepository.AddCrop(crop);
                return CreatedAtAction(nameof(GetCropById), new { id = createdCrop.Id }, createdCrop);
            }

            [HttpPut("{id}")]
            public IActionResult UpdateCrop(int id, [FromBody] Crop crop)
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var updatedCrop = _cropRepository.UpdateCrop(id, crop);
                if (updatedCrop == null) return NotFound();

                return Ok(updatedCrop);
            }

            [HttpDelete("{id}")]
            public IActionResult DeleteCrop(int id)
            {
                var success = _cropRepository.DeleteCrop(id);
                if (!success) return NotFound();

                return NoContent();
            }
        }
    }
