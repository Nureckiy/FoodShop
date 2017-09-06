using Hohotel.Controllers;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Controllers
{
    public class DishControllerTest
    {
        private readonly DishController _controller;
        private readonly Mock<IDishService> _service;

        public DishControllerTest()
        {
            _service = new Mock<IDishService>();
            _controller = new DishController(_service.Object);
            _controller.ControllerContext = TestControllerContext.Create("test user");
        }

        [Fact]
        public void Popular()
        {
            var responce = TestData.Create.Dishes(3);

            _service.Setup(s => s.GetPopular(It.IsAny<int>())).Returns(responce);

            var result = _controller.Popular(0);
            
            Assert.Equal(responce, result);
        }

        [Fact]
        public void Get()
        {
            var responce = TestData.Create.Dishes(3);

            _service.Setup(s => s.GetByCategoryName(It.IsAny<string>())).Returns(responce);

            var result = _controller.Get("some name");

            Assert.Equal(3, result.Count);
            Assert.Equal(responce, result);
        }

        [Fact]
        public void Post()
        {
            var request = TestData.Create.Dish();

            _service.Setup(s => s.AddDish(It.IsAny<Dish>())).Returns(request);

            var result = _controller.Post(request);

            Assert.Equal("test user", result.CreatedBy);
            Assert.Equal("test user", result.ModifiedBy);
            Assert.NotNull(result.CreatedTime);
            Assert.NotNull(result.ModifiedTime);
        }

        [Fact]
        public void Put()
        {
            var request = TestData.Create.Dish();

            _service.Setup(s => s.EditDish(It.IsAny<Dish>())).Returns(request);

            var result = _controller.Put(request);

            Assert.Equal(request, result);
            Assert.Null(request.CreatedBy);
            Assert.Equal("test user", request.ModifiedBy);
            Assert.NotNull(request.ModifiedTime);
            Assert.Null(request.CreatedTime);
        }

        [Fact]
        public void Delete()
        {
            _service.Setup(s => s.DeleteDish(It.IsAny<int>())).Verifiable();

            _controller.Delete(0);

            _service.Verify(s => s.DeleteDish(It.IsAny<int>()), Times.Once);
        }
    }
}
