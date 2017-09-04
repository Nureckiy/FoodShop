using System;
using System.Collections.Generic;
using Hohotel.Controllers;
using Hohotel.Enums;
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

        [Fact]
        public void All()
        {
            var responce = new List<OrderView> {new OrderView {UserName = "some user"}};

            _service.Setup(s => s.GetOrders()).Returns(responce);

            Assert.Equal(responce, _controller.GetAll());
        }

        [Fact]
        public void Status()
        {
            var responce = new OrderView() {UserName = "some user"};
            var request = new UpdateStatusModel()
            {
                CompletionDate = new DateTime(2017)
            };
            _service.Setup(s => s.ChangeStatus(It.IsAny<UpdateStatusModel>())).Returns(responce);

            Assert.Equal(responce, _controller.ChangeStatus(request));
            Assert.Equal("test user", request.StatusUpdatedBy);
            Assert.Null(request.CompletionDate);
            Assert.NotNull(request.StatusUpdatedDate);

            request.Status = OrderStatus.Closed;
            _controller.ChangeStatus(request);

            Assert.NotNull(request.CompletionDate);
        }
    }
}
