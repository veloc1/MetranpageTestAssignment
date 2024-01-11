using Microsoft.AspNetCore.Mvc;

namespace worker.Controllers
{
  public class BuildRequest 
  {
    public int? id { get; set; }
  }

  [Route("/")]
  [ApiController]
  public class AppController : ControllerBase
  {

    public AppController()
    {
    }

    [HttpPost("build")]
    public async Task<IActionResult> build(BuildRequest requestData)
    {
      await Task.CompletedTask;
      return Ok(new { success = true, buildedProject = $"Project ID {requestData.id}" });
    }
  }
}
