using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;
using Hohotel.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
            _service.SendFeedback(feedback, User.Identity.Name);
        }
    }
}
