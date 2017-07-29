using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly OrderService _service;

        public OrderServiceTest()
        {
            _context = new Mock<HohotelContext>();
            var mapper = AutomapperConfig.Initialize();
            _service = new OrderService(_context.Object, mapper);
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
            
            var order = _service.PlaceOrder(orderInfo);
            
            orderMock.Verify(m => m.Add(It.IsAny<Order>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
            Assert.Equal(order.Total, 65.94m);
            Assert.Equal(order.Status, OrderStatus.Opened);
        }

        [Fact]
        public void PlaceOrder_NullableVariables_ThrowError()
        {
            _context.Setup(c => c.Orders).Returns(DbSetMock.Create(new Order()).Object);
            Assert.Throws<NullReferenceException>(() => _service.PlaceOrder(null));
        }

        [Fact]
        public void GetUserOrders()
        {
            var orders = TestData.Create.Orders(3);
            orders[0].UserId = "first user";
            orders[1].UserId = "second user";
            orders[2].UserId = "first user";

            _context.Setup(c => c.Orders).Returns(DbSetMock.Create(orders.ToArray()).Object);

            var result = _service.GetUserOrders("first user");
            Assert.Equal(2, result.Count);
            Assert.True(result.All(o => o.UserId == "first user"));
        }

        [Fact]
        public void CountTotal_SingleObject()
        {
            var portion = TestData.Create.DishPortion(price: 10.17m);
            var portionOrder = TestData.Create.DishPortionOrder(3, dishPortion: portion);
            Assert.Equal(30.51m, _service.CountTotal(portionOrder));
        }

        [Fact]
        public void CountTotal_ListObjects()
        {
            var portion = TestData.Create.DishPortion(price: 10.17m);
            var portionOrders = new List<DishPortionOrder>();
            portionOrders.Add(TestData.Create.DishPortionOrder(3, dishPortion: portion));
            portionOrders.Add(TestData.Create.DishPortionOrder(2, dishPortion: portion));
            Assert.Equal(50.85m, _service.CountTotal(portionOrders));
        }
    }
}
