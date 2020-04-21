using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public HomeController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            const string uploadsFolder = "uploads";
            var uploadsRootFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsRootFolder))
            {
                Directory.CreateDirectory(uploadsRootFolder);
            }

            if (file == null || file.Length == 0)
            {
                return NoContent();
            }

            var filePath = Path.Combine(uploadsRootFolder, file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Content($"/{uploadsFolder}/{file.Name}");
        }
    }
}