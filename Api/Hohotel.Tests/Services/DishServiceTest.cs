using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Services
{
    public class DishServiceTest
    {
        private readonly Mock<HohotelContext> _context;
        private readonly DishService _service;

        public DishServiceTest()
        {
            _context = new Mock<HohotelContext>();
            _service = new DishService(_context.Object);
        }

        [Fact]
        public void GetPopular_PositiveCountLowThanMaxSize_ReturnElements()
        {
            var dishes = ComposeDishes();
            _context.Setup(c => c.Dishes).Returns(DbSetMock.Create(dishes.ToArray()).Object);
            var expected = new List<Dish>() { dishes[0], dishes[2] };
            Assert.Equal(expected, _service.GetPopular(2));
        }

        [Fact]
        public void GetPopular_PositiveCountMoreThanMaxSize_ReturnElements()
        {
            var dishes = ComposeDishes();
            _context.Setup(c => c.Dishes).Returns(DbSetMock.Create(dishes.ToArray()).Object);
            var expected = new List<Dish>() { dishes[0], dishes[2], dishes[1] };
            Assert.Equal(expected, _service.GetPopular(4));
        }

        [Fact]
        public void GetPopular_NegativeCount_ReturnEmptyArray()
        {
            var dishes = ComposeDishes();
            _context.Setup(c => c.Dishes).Returns(DbSetMock.Create(dishes.ToArray()).Object);
            Assert.Equal(new List<Dish>(), _service.GetPopular(-3));
        }

        [Fact]
        public void GetByCategoryName_MatchedName_ReturnElements()
        {
            var dishes = ComposeDishes();
            _context.Setup(c => c.Dishes).Returns(DbSetMock.Create(dishes.ToArray()).Object);
            var expected = new List<Dish>() { dishes[2] };
            Assert.Equal(expected, _service.GetByCategoryName("pizza"));
        }

        [Fact]
        public void GetByCategoryName_NonMatchedName_ReturnEmptyArray()
        {
            var dishes = ComposeDishes();
            _context.Setup(c => c.Dishes).Returns(DbSetMock.Create(dishes.ToArray()).Object);
            Assert.Empty(_service.GetByCategoryName("salads"));
        }

        [Fact]
        public void GetByCategoryName_NullableName_ThrowException()
        {
            var dishes = ComposeDishes();
            _context.Setup(c => c.Dishes).Returns(DbSetMock.Create(dishes.ToArray()).Object);
            Assert.Throws<NullReferenceException>(() => _service.GetByCategoryName(null));
        }

        private IList<Dish> ComposeDishes()
        {
            var dishes = TestData.Create.Dishes(3);
            dishes[0].DishPortions = new List<DishPortion>()
            {
                TestData.Create.DishPortion(dishPortionOrders: TestData.Create.DishPortionOrders(2)),
                TestData.Create.DishPortion(dishPortionOrders: TestData.Create.DishPortionOrders(1))
            };
            dishes[1].DishPortions = TestData.Create.DishPortions(1);
            dishes[2].DishPortions = TestData.Create.DishPortions(1, TestData.Create.DishPortionOrders(1));
            dishes[2].Category = DishTypes.Pizza;
            return dishes;
        }
    }
}
