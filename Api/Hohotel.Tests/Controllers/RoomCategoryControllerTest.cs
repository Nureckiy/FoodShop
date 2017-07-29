using System.Collections.Generic;
using Hohotel.Controllers;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Moq;
using Xunit;

namespace Hohotel.Tests.Controllers
{
    public class RoomCategoryControllerTest
    {
        private readonly RoomCategoryController _controller;
        private readonly Mock<IRoomCategoryService> _service;

        public RoomCategoryControllerTest()
        {
            _service = new Mock<IRoomCategoryService>();
            _controller = new RoomCategoryController(_service.Object);
            _controller.ControllerContext = TestControllerContext.Create("test user");
        }

        [Fact]
        public void Get()
        {
            var responce = new List<PreviewCategory>();
            responce.Add(new PreviewCategory());

            _service.Setup(s => s.GetRoomCategories()).Returns(responce);

            var result = _controller.Get();

            Assert.Equal(responce, result);
        }

        [Fact]
        public void Get_Id()
        {
            var responce = new FullRoomCategory();

            _service.Setup(s => s.GetRoomCategoryById(It.IsAny<int>())).Returns(responce);

            var result = _controller.Get(3);

            Assert.Equal(responce, result);
        }

        [Fact]
        public void InStock()
        {
            var responce = new List<ItemInfo>();
            responce.Add(new ItemInfo());

            _service.Setup(s => s.GetCategoriesInfo()).Returns(responce);

            var result = _controller.InStock();

            Assert.Equal(responce, result);
        }

        [Fact]
        public void Post()
        {
            var responce = TestData.Create.RoomCategory();
            var request = new RoomCategory();

            _service.Setup(s => s.AddRoomCategory(It.IsAny<RoomCategory>())).Returns(responce);

            var result = _controller.Post(request);

            Assert.Equal(responce, result);
            Assert.Equal("test user", request.CreatedBy);
            Assert.Equal("test user", request.ModifiedBy);
            Assert.NotNull(request.CreatedTime);
            Assert.NotNull(request.ModifiedTime);
        }

        [Fact]
        public void Put()
        {
            var responce = TestData.Create.RoomCategory();
            var request = new RoomCategory();

            _service.Setup(s => s.EditRoomCategory(It.IsAny<RoomCategory>())).Returns(responce);

            var result = _controller.Put(request);

            Assert.Equal(responce, result);
            Assert.Null(request.CreatedBy);
            Assert.Equal("test user", request.ModifiedBy);
            Assert.NotNull(request.ModifiedTime);
            Assert.Null(request.CreatedTime);
        }

        [Fact]
        public void Delete()
        {
            _service.Setup(s => s.DeleteRoomCategory(It.IsAny<int>())).Verifiable();

            _controller.Delete(0);

            _service.Verify(s => s.DeleteRoomCategory(0), Times.Once);
        }
    }
}
