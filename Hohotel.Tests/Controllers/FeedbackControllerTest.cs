using Hohotel.Controllers;
using Hohotel.Models;
using Hohotel.Services;
using Hohotel.Tests.Helper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Controllers
{
    public class FeedbackControllerTest
    {
        private readonly FeedbackController _controller;
        private readonly Mock<IMailService> _service;

        public FeedbackControllerTest()
        {
            _service = new Mock<IMailService>();
            _controller = new FeedbackController(_service.Object);
            _controller.ControllerContext = TestControllerContext.Create("test user");
        }

        [Fact]
        public void Post()
        {
            _service.Setup(s => s.SendFeedback(It.IsAny<Feedback>())).Verifiable();

            var request = new Feedback();
            _controller.Post(request);

            Assert.Equal("test user", request.UserId);
            _service.Verify(s => s.SendFeedback(It.IsAny<Feedback>()), Times.Once);
        }
    }
}
