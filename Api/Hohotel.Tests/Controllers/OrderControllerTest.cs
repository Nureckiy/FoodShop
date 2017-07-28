using System.Collections.Generic;
using Hohotel.Controllers;
using Hohotel.Models;
using Hohotel.Services;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Controllers
{
    public class OrderControllerTest
    {
        private readonly OrderController _controller;
        private readonly Mock<IOrderService> _service;

        public OrderControllerTest()
        {
            _service = new Mock<IOrderService>();
            _controller = new OrderController(_service.Object);
            _controller.ControllerContext = TestControllerContext.Create("test user");
        }

        [Fact]
        public void Post()
        {
            var request = new OrderInfo();
            var responce = TestData.Create.Order();

            _service.Setup(s => s.PlaceOrder(It.IsAny<OrderInfo>())).Returns(responce);

            var result = _controller.Post(request);
            
            Assert.Equal(responce, result);
            Assert.Equal("test user", request.UserId);
        }

        [Fact]
        public void Get()
        {
            var responce = new List<OrderView>();
            _service.Setup(s => s.GetUserOrders(It.IsAny<string>())).Returns(responce);

            var result = _controller.Get();

            Assert.Equal(responce, result);
            _service.Verify(s => s.GetUserOrders("test user"), Times.Once);
        }
    }
}
