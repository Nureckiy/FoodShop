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
    public class RoomControllerTest
    {
        private readonly RoomController _controller;
        private readonly Mock<IRoomService> _service;

        public RoomControllerTest()
        {
            _service = new Mock<IRoomService>();
            _controller = new RoomController(_service.Object);
            _controller.ControllerContext = TestControllerContext.Create("test user");
        }

        [Fact]
        public void CheckAvailability()
        {
            _service.Setup(s => s.IsAvailable(It.IsAny<RoomBooking>())).Returns(true);

            var result = _controller.CheckAvailability(new RoomBooking());

            Assert.True(result);
        }

        [Fact]
        public void Get()
        {
            var responce = TestData.Create.Rooms(3);

            _service.Setup(s => s.Filter(It.IsAny<RoomFilter>())).Returns(responce);

            var result = _controller.Get(new RoomFilter());

            Assert.Equal(responce, result);
        }

        [Fact]
        public void Book()
        {
            var request = new Booking();
            _service.Setup(s => s.Book(It.IsAny<Booking>())).Verifiable();

            _controller.Book(request);

            Assert.Equal("test user", request.UserId);
            _service.Verify(s => s.Book(It.IsAny<Booking>()), Times.Once);
        }

        [Fact]
        public void Active()
        {
            var responce = new List<string>() {"somme string"};

            _service.Setup(s => s.GetActive(It.IsAny<string>())).Returns(responce);

            var result = _controller.Active();

            Assert.Equal(responce, result);
            _service.Verify(s => s.GetActive("test user"), Times.Once);
        }

        [Fact]
        public void Bookings()
        {
            var responce = new List<BookingView> {new BookingView() {Name = "some name"}};

            _service.Setup(s => s.GetUserBookings(It.IsAny<string>())).Returns(responce);

            var result = _controller.GetBookings();

            Assert.Equal(responce, result);
            _service.Verify(s => s.GetUserBookings("test user"));
        }

        [Fact]
        public void AllBookings()
        {
            var responce = new List<BookingView> { new BookingView() { Name = "some name" } };

            _service.Setup(s => s.GetBookings()).Returns(responce);

            var result = _controller.GetAllBookings();

            Assert.Equal(responce, result);
        }

        [Fact]
        public void BookingStatus()
        {
            var responce = new BookingView() {Name = "some name"};
            var request = new UpdateStatusModel();

            _service.Setup(s => s.ChangeStatus(It.IsAny<UpdateStatusModel>())).Returns(responce);

            var result = _controller.ChangeBookingStatus(request);

            Assert.Equal(responce, result);
            Assert.Equal("test user", request.StatusUpdatedBy);
            Assert.NotNull(request.StatusUpdatedDate);
        }

        [Fact]
        public void Post()
        {
            var request = new Room();
            var responce = new Room();

            _service.Setup(s => s.AddRoom(It.IsAny<Room>())).Returns(responce);

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
            var request = new Room();
            var responce = new Room();

            _service.Setup(s => s.EditRoom(It.IsAny<Room>())).Returns(responce);

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
            _service.Setup(s => s.DeleteRoom(It.IsAny<int>())).Verifiable();

            _controller.Delete(0);

            _service.Verify(s => s.DeleteRoom(0), Times.Once);
        }
    }
}
