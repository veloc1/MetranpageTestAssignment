using Microsoft.AspNetCore.Mvc;

namespace worker.Controllers
{

  public class Template
  {
    public int? id { get; set; }
    public string? arg1 { get; set; }
    public string? arg2 { get; set; }
  }
  public class BuildRequest 
  {
    public int? id { get; set; }
    public Template? template { get; set; }
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
      Template? template = requestData.template;
      if (template == null)
      {
        return NotFound();
      }
      return Ok(new { success = true, buildedProject = $"Project ID {requestData.id}, Template ID {template.id} args: arg1 = {template.arg1}, arg2 = {template.arg2}" });
    }
  }
}
