using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class RoomBookingFactory
    {
        public static RoomBooking RoomBooking(this ITestDataFactory factory,
            int roomId = 0,
            Room room = null,
            int bookingId = 0,
            Booking booking = null)
        {
            var model = new RoomBooking()
            {
                RoomId = roomId,
                Room = room ?? TestData.Create.Room(roomId),
                BookingId = bookingId,
                Booking = booking ?? TestData.Create.Booking(bookingId)
            };
            return model;
        }

        public static IList<RoomBooking> RoomBookings(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(e => factory.RoomBooking()).ToList();
        }
    }
}
