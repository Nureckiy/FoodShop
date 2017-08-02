using Hohotel.Models;
using Hohotel.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hohotel.Controllers
{
    [Route("api/[controller]")]
    public class FeedbackController : Controller
    {
        private readonly IMailService _service;

        public FeedbackController(IMailService service)
        {
            _service = service;
        }

        // POST api/feedback
        [HttpPost]
        public void Post([FromBody]Feedback feedback)
        {
            feedback.UserId = User.Identity.Name;
            _service.SendFeedback(feedback);
        }
    }
}
