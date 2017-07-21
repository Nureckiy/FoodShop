using System;
using AutoMapper;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Hohotel.Tests.Mapper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Services
{
    public class OrderServiceTest
    {
        private readonly Mock<HohotelContext> _context;
        private readonly IMapper _mapper;
        private readonly OrderService _service;

        public OrderServiceTest()
        {
            _context = new Mock<HohotelContext>();
            _mapper = AutomapperConfig.GetConfig().CreateMapper();
            _service = new OrderService(_context.Object, _mapper);
        }

        [Fact]
        public void PlaceOrder_FilledObject_ShouldSaveToDatabase()
        {
            var portions = TestData.Create.DishPortionOrders(3, 2, 0);
            var orderInfo = TestData.Create.OrderInfo(portions: portions);
            var portion = TestData.Create.DishPortion(price: 10.99m);
            var orderMock = DbSetMock.Create(new Order());

            _context.Setup(c => c.DishPortions).Returns(DbSetMock.Create(portion).Object);
            _context.Setup(c => c.Orders).Returns(orderMock.Object);

            var order = _service.PlaceOrder(orderInfo, "userid");
            
            orderMock.Verify(m => m.Add(It.IsAny<Order>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
            Assert.Equal(order.UserId, "userid");
            Assert.Equal(order.Total, 65.94m);
            Assert.Equal(order.Status, OrderStatus.Opened);
        }

        [Fact]
        public void PlaceOrder_NullableVariables_ThrowError()
        {
            _context.Setup(c => c.Orders).Returns(DbSetMock.Create(new Order()).Object);
            Assert.Throws<NullReferenceException>(() => _service.PlaceOrder(null, "userid"));
        }
    }
}
