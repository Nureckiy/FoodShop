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

        [Fact]
        public void AddDish()
        {
            var portions = TestData.Create.DishPortions(3);
            var dish = TestData.Create.Dish(dishPortions: portions);
            var dishesMock = DbSetMock.Create(new Dish[0]);

            _context.Setup(c => c.Dishes).Returns(dishesMock.Object);

            _service.AddDish(dish, "userId");

            dishesMock.Verify(m => m.Add(It.IsAny<Dish>()), Times.Once);
            _context.Verify(m => m.SaveChanges(), Times.Once);
            Assert.Equal("userId", dish.CreatedBy);
            Assert.Equal("userId", dish.ModifiedBy);
            Assert.Equal(portions, dish.DishPortions);
            Assert.NotNull(dish.CreatedTime);
            Assert.NotNull(dish.ModifiedTime);
        }

        [Fact]
        public void EditDish()
        {
            var dish = TestData.Create.Dish(2, dishPortions: TestData.Create.DishPortions(3));
            var dishesMock = DbSetMock.Create(dish);

            _context.Setup(c => c.Dishes).Returns(dishesMock.Object);

            var portions = TestData.Create.DishPortions(4);
            var editedDish = TestData.Create.Dish(2, dishPortions: portions);

            _service.EditDish(editedDish, "userId");

            dishesMock.Verify(m => m.Update(It.IsAny<Dish>()), Times.Once);
            _context.Verify(m => m.SaveChanges(), Times.Once);
            Assert.Equal("userId", editedDish.ModifiedBy);
            Assert.Equal(portions, editedDish.DishPortions);
            Assert.NotNull(editedDish.ModifiedTime);
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
