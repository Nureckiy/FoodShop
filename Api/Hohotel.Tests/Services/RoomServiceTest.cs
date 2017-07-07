using System;
using System.Collections.Generic;
using System.Linq;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Hohotel.Services;
using Hohotel.Tests.Factories;
using Hohotel.Tests.Factories.Models;
using Hohotel.Tests.Helper;
using Xunit;
using Moq;

namespace Hohotel.Tests
{
    public class RoomServiceTest
    {
        private class RoomTestModel
        {
            public IList<Room> Rooms { get; set; }
            public IList<Booking> Bookings { get; set; }
            public IList<RoomBooking> RoomBookings { get; set; }
        }

        private Mock<HohotelContext> context;

        public RoomServiceTest()
        {
            context = new Mock<HohotelContext>();
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
            var testModel = ComposeTestModel(Convert.ToDateTime(startBookingDate), Convert.ToDateTime(endBookingDate));
            context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1, new DateTime(2017, 3, 2), new DateTime(2017, 3, 14));
            var service = new RoomService(context.Object);
            var expected = new List<Room>();
            Assert.Equal(expected, service.Filter(filter));
        }

        [Theory,
        InlineData("15/02/2017", "01/03/2017"),
        InlineData("15/02/2017", "02/03/2017"),
        InlineData("20/03/2017", "21/03/2017"),
        InlineData("14/03/2017", "21/03/2017")]
        public void Filter_NonOverlappingDateRanges_ReturnArrayElements(string startBookingDate, string endBookingDate)
        {
            var testModel = ComposeTestModel(Convert.ToDateTime(startBookingDate), Convert.ToDateTime(endBookingDate));
            context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1, new DateTime(2017, 3, 2), new DateTime(2017, 3, 14));
            var service = new RoomService(context.Object);
            var expected = testModel.Rooms;
            Assert.Equal(expected, service.Filter(filter));
        }

        [Fact]
        public void Filter_UnmatchedCategoryId_ReturnEmptyArray()
        {
            var testModel = ComposeTestModel(Convert.ToDateTime(new DateTime(2017, 3, 6)), Convert.ToDateTime(new DateTime(2017, 3, 10)));
            context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(2);
            var service = new RoomService(context.Object);
            var expected = new List<Room>();
            Assert.Equal(expected, service.Filter(filter));
        }

        [Fact]
        public void Filter_MatchedCategoryId_ReturnArrayElements()
        {
            var testModel = ComposeTestModel(Convert.ToDateTime(new DateTime(2017, 3, 6)), Convert.ToDateTime(new DateTime(2017, 3, 10)));
            context.Setup(c => c.Rooms).Returns(DbSetMock.Create(testModel.Rooms.ToArray()).Object);
            context.Setup(c => c.Bookings).Returns(DbSetMock.Create(testModel.Bookings.ToArray()).Object);
            var filter = TestData.Create.RoomFilter(1);
            var service = new RoomService(context.Object);
            var expected = testModel.Rooms;
            Assert.Equal(expected, service.Filter(filter));
        }

        private RoomTestModel ComposeTestModel(DateTime bookingStartDate, DateTime bookingEndDate, RoomCategory category = null)
        {
            var roomBookings = TestData.Create.RoomBookings(1);
            var room = TestData.Create.Room(
                category: category ?? TestData.Create.RoomCategory(1), 
                roomBookings: roomBookings);
            var booking = TestData.Create.Booking(
                startDate: bookingStartDate, 
                endDate: bookingEndDate, 
                roomBookings: roomBookings);
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
