using System;
using System.Collections.Generic;
using System.Linq;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Services.Mapping;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Hohotel.Tests.Mapper;
using Xunit;
using Moq;

namespace Hohotel.Tests.Services
{
    public class RoomServiceTest
    {
        private class RoomTestModel
        {
            public IList<Room> Rooms { get; set; }
            public IList<Booking> Bookings { get; set; }
            public IList<RoomBooking> RoomBookings { get; set; }
        }

        private readonly Mock<HohotelContext> _context;
        private readonly RoomService _service;

        public RoomServiceTest()
        {
            _context = new Mock<HohotelContext>();
            var mapper = AutomapperConfig.Initialize();
            _service = new RoomService(_context.Object, mapper);
        }

        [Theory,
        InlineData("06/03/2017", "10/03/2017"),
        InlineData("01/03/2017", "14/03/2017"),
        InlineData("01/03/2017", "5/03/2017"),
        InlineData("07/03/2017", "15/03/2017"),
        InlineData("07/03/2017", "14/03/2017"),
        InlineData("02/03/2017", "3/03/2017")]
        public void Filter_OverlappingDateRange_ReturnEmptyArray(string startBookingDate, string endBookingDate)
        {
            var testModel = ComposeTestData(Convert.ToDateTime(startBookingDate), Convert.ToDateTime(endBookingDate));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1, new DateTime(2017, 3, 2), new DateTime(2017, 3, 14));
            Assert.Empty( _service.Filter(filter));
        }

        [Fact]
        public void Filter_CanceledOrClosedOrderStatus_ReturnArrayElements()
        {
            var testModel = ComposeTestData(Convert.ToDateTime("06/03/2017"), Convert.ToDateTime("10/03/2017"));
            testModel.Bookings[0].Status = OrderStatus.Canceled;
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1, new DateTime(2017, 3, 2), new DateTime(2017, 3, 14));
            var expected = testModel.Rooms;
            Assert.Equal(expected, _service.Filter(filter));

            testModel.Bookings[0].Status = OrderStatus.Closed;
            Assert.Equal(expected, _service.Filter(filter));
        }

        [Theory,
        InlineData("15/02/2017", "01/03/2017"),
        InlineData("15/02/2017", "02/03/2017"),
        InlineData("20/03/2017", "21/03/2017"),
        InlineData("14/03/2017", "21/03/2017")]
        public void Filter_NonOverlappingDateRanges_ReturnArrayElements(string startBookingDate, string endBookingDate)
        {
            var testModel = ComposeTestData(Convert.ToDateTime(startBookingDate), Convert.ToDateTime(endBookingDate));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1, new DateTime(2017, 3, 2), new DateTime(2017, 3, 14));
            var expected = testModel.Rooms;
            Assert.Equal(expected, _service.Filter(filter));
        }

        [Fact]
        public void Filter_UnmatchedCategoryId_ReturnEmptyArray()
        {
            var testModel = ComposeTestData(Convert.ToDateTime(new DateTime(2017, 3, 6)), Convert.ToDateTime(new DateTime(2017, 3, 10)));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(2);
            Assert.Empty(_service.Filter(filter));
        }

        [Fact]
        public void Filter_MatchedCategoryId_ReturnArrayElements()
        {
            var testModel = ComposeTestData(Convert.ToDateTime(new DateTime(2017, 3, 6)), Convert.ToDateTime(new DateTime(2017, 3, 10)));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1);
            var expected = testModel.Rooms;
            Assert.Equal(expected, _service.Filter(filter));
        }

        [Theory,
         InlineData("15/02/2017", "01/03/2017"),
         InlineData("15/02/2017", "02/03/2017"),
         InlineData("20/03/2017", "21/03/2017"),
         InlineData("14/03/2017", "21/03/2017")]
        public void IsAvailable_NotOccupped_ReturnTrue(string startDate, string endDate)
        {
            var testModel = ComposeTestData(Convert.ToDateTime(startDate), Convert.ToDateTime(endDate));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var roomBooking = TestData.Create.RoomBooking(startDate: new DateTime(2017, 3, 2), endDate: new DateTime(2017, 3, 14));
            Assert.True(_service.IsAvailable(roomBooking));
        }

        [Theory,
         InlineData("06/03/2017", "10/03/2017"),
         InlineData("01/03/2017", "14/03/2017"),
         InlineData("01/03/2017", "5/03/2017"),
         InlineData("07/03/2017", "15/03/2017"),
         InlineData("07/03/2017", "14/03/2017"),
         InlineData("02/03/2017", "3/03/2017")]
        public void IsAvailable_Occupped_ReturnFalse(string startDate, string endDate)
        {
            var testModel = ComposeTestData(Convert.ToDateTime(startDate), Convert.ToDateTime(endDate));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var roomBooking = TestData.Create.RoomBooking(startDate: new DateTime(2017, 3, 2), endDate: new DateTime(2017, 3, 14));
            Assert.False(_service.IsAvailable(roomBooking));
        }

        [Fact]
        public void IsAvailable_ClosedOrCanceledOrderStatus_ReturnTrue()
        {
            var testModel = ComposeTestData(new DateTime(2017, 3, 6), new DateTime(2017, 3, 10));
            var roomBooking = TestData.Create.RoomBooking(startDate: new DateTime(2017, 3, 2), endDate: new DateTime(2017, 3, 14));
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);   

            testModel.Bookings[0].Status = OrderStatus.Canceled;
            Assert.True(_service.IsAvailable(roomBooking));

            testModel.Bookings[0].Status = OrderStatus.Closed;
            Assert.True(_service.IsAvailable(roomBooking));
        }

        [Fact]
        public void IsAvailable_WithoutBokingDate_ThrowsArgumentException()
        {
            var roomBooking = TestData.Create.RoomBooking(booking: TestData.Create.Booking());
            var message = "Date range is not correct";

            Exception exWithoutAnyDate = Assert.Throws<ArgumentException>(() => _service.IsAvailable(roomBooking));

            roomBooking.EndDate = new DateTime();
            Exception exWithoutStartDate = Assert.Throws<ArgumentException>(() => _service.IsAvailable(roomBooking));

            roomBooking.EndDate = null;
            roomBooking.StartDate = new DateTime();
            Exception exWithoutEndDate = Assert.Throws<ArgumentException>(() => _service.IsAvailable(roomBooking));

            Assert.Equal(message, exWithoutAnyDate.Message);
            Assert.Equal(message, exWithoutStartDate.Message);
            Assert.Equal(message, exWithoutEndDate.Message);
        }

        [Fact]
        public void Book()
        {
            var room = TestData.Create.Room(1, price: 30);
            var roomBooking = TestData.Create.RoomBooking(1, startDate: new DateTime(2017, 3, 2), endDate: new DateTime(2017, 3, 14));
            var booking = TestData.Create.Booking(roomBookings: new List<RoomBooking>() { roomBooking });
            var bookingsMock = DbSetMock.Create(new Booking());

            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(room).Object);
            _context.Setup(c => c.Bookings).Returns(bookingsMock.Object);
            
            var result = _service.Book(booking);

            bookingsMock.Verify(m => m.Add(It.IsAny<Booking>()), Times.Once);
            _context.Verify(m => m.SaveChanges(), Times.Once);
            Assert.Equal(room, result.RoomBookings[0].Room);
        }

        [Fact]
        public void GetBookings()
        {
            var bookings = TestData.Create.Bookings(3);

            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(bookings.ToArray()).Object);

            var result = _service.GetBookings();

            Assert.Equal(3, result.Count);
            Assert.All(result, item => Assert.Equal(OrderStatus.NotStarted, item.Status));
        }

        [Fact]
        public void ChageStatus()
        {
            var bookings = TestData.Create.Bookings(3);
            var bookingsMock = DbSetMock.Create(bookings.ToArray());

            var updateStatusModel = new UpdateStatusModel
            {
                Id = 1,
                Status = OrderStatus.Approved,
                StatusUpdatedBy = "some user",
                StatusUpdatedDate = new DateTime(2017, 1, 1)
            };

            _context.Setup(c => c.Bookings).Returns(bookingsMock.Object);

            //var result = _service.ChangeStatus(updateStatusModel);

            //Assert.Equal(updateStatusModel.Id, result.Id);
            //Assert.Equal(updateStatusModel.Status, result.Status);
            //Assert.Equal(updateStatusModel.StatusUpdatedBy, result.StatusUpdatedBy);
            //Assert.Equal(updateStatusModel.StatusUpdatedDate, result.StatusUpdatedDate);
            //bookingsMock.Verify(bm => bm.Update(It.IsAny<Booking>()), Times.Once);
            //_context.Verify(c => c.SaveChanges(), Times.Once);
        }

        [Fact]
        public void CountTotal_RoomBookingObject_ReturnTotal()
        {
            var room = TestData.Create.Room(price: 14.56m);
            var roomBooking = TestData.Create.RoomBooking(room: room, startDate: new DateTime(2017, 3, 2), endDate: new DateTime(2017, 3, 5));
            var expected = 43.68m;
            Assert.Equal(expected, _service.CountTotal(roomBooking));
        }

        [Fact]
        public void CountTotal_RoomBookingObjectsList_ReturnTotal()
        {
            var roomBookings = new List<RoomBooking>();
            roomBookings.Add(TestData.Create.RoomBooking(
                startDate: new DateTime(2017, 3, 2),
                endDate: new DateTime(2017, 3, 4),
                room: TestData.Create.Room(price: 14.56m)
                ));
            roomBookings.Add(TestData.Create.RoomBooking(
                startDate: new DateTime(2017, 3, 5),
                endDate: new DateTime(2017, 3, 6),
                room: TestData.Create.Room(price: 33.10m)
            ));
            var expected = 62.22m;

            Assert.Equal(expected, _service.CountTotal(roomBookings.ToList()));
        }

        [Fact]
        public void GetUserBookings()
        {
            var bookings = TestData.Create.Bookings(3);
            bookings[0].UserId = "first user";
            bookings[1].UserId = "second user";
            bookings[2].UserId = "second user";

            _context.Setup(c => c.Bookings).Returns(DbSetMock.Create(bookings.ToArray()).Object);

            var result = _service.GetUserBookings("second user");
            Assert.Equal(2, result.Count);
            Assert.True(result.All(b => b.UserId == "second user"));
        }

        [Fact]
        public void GetActive()
        {
            var now = DateTime.Now;
            var yesterday = now.AddDays(-1);
            var tomorrow = now.AddDays(1);
            var rooms = TestData.Create.Rooms(3);
            var booking = TestData.Create.Booking(userId: "userid", orderStatus: OrderStatus.Opened);
            var matchedRoomBoking = TestData.Create.RoomBooking(startDate: yesterday, endDate: tomorrow, booking: booking);
            rooms[0].RoomBookings = new List<RoomBooking>{matchedRoomBoking};
            rooms[0].Address = "room1 address";
            
            _context.Setup(c => c.Rooms).Returns(DbSetMock.Create(rooms.ToArray()).Object);

            var result = _service.GetActive("userid");

            Assert.Single(result);
            Assert.Equal("room1 address", result[0]);
        }

        [Fact]
        public void AddRoom()
        {
            var category = TestData.Create.RoomCategory(3);
            var room = TestData.Create.Room(category: category);
            var roomMock = DbSetMock.Create(new Room[0]);

            _context.Setup(c => c.Rooms).Returns(roomMock.Object);
            _context.Setup(c => c.RoomCategories).Returns(DbSetMock.Create(category).Object);

            var result = _service.AddRoom(room);

            roomMock.Verify(m => m.Add(It.IsAny<Room>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
            Assert.Equal(room, result);
        }

        [Fact]
        public void EditRoom()
        {
            var category = TestData.Create.RoomCategory(3);
            var room = TestData.Create.Room(category: category);
            var roomMock = DbSetMock.Create(room);

            _context.Setup(c => c.Rooms).Returns(roomMock.Object);
            _context.Setup(c => c.RoomCategories).Returns(DbSetMock.Create(category).Object);

            var newRoom = TestData.Create.Room(category: category, price: 10);

            var result = _service.EditRoom(newRoom);

            roomMock.Verify(m => m.Update(It.IsAny<Room>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
            Assert.Equal(room.Id, result.Id);
        }

        [Fact]
        public void DeleteRoom()
        {
            var room = TestData.Create.Room(4);
            var roomMock = DbSetMock.Create(room);

            _context.Setup(c => c.Rooms).Returns(roomMock.Object);

            _service.DeleteRoom(4);

            roomMock.Verify(m => m.Remove(It.IsAny<Room>()), Times.Once);
            _context.Verify(c => c.SaveChanges(), Times.Once);
        }

        private RoomTestModel ComposeTestData(DateTime bookingStartDate, DateTime bookingEndDate, RoomCategory category = null)
        {
            var roomBookings = new List<RoomBooking>()
            {
                TestData.Create.RoomBooking(startDate: bookingStartDate, endDate: bookingEndDate)
            };
            var room = TestData.Create.Room(
                category: category ?? TestData.Create.RoomCategory(1), 
                roomBookings: roomBookings);
            var booking = TestData.Create.Booking(roomBookings: roomBookings);
            roomBookings[0].Room = room;
            roomBookings[0].Booking = booking;
            var testModel = new RoomTestModel()
            {
                Rooms = new[] {room},
                Bookings = new[] {booking},
                RoomBookings = roomBookings
            };
            return testModel;
        }
    }
}
