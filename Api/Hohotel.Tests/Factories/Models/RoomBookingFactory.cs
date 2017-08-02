using System;
using System.Collections.Generic;
using System.Linq;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class RoomBookingFactory
    {
        public static RoomBooking RoomBooking(this ITestDataFactory factory,
            int roomId = 0,
            Room room = null,
            int bookingId = 0,
            Booking booking = null,
            DateTime? startDate = null,
            DateTime? endDate = null)
        {
            var model = new RoomBooking()
            {
                RoomId = roomId,
                Room = room,
                BookingId = bookingId,
                Booking = booking,
                StartDate = startDate,
                EndDate = endDate
            };
            return model;
        }

        public static IList<RoomBooking> RoomBookings(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(e => factory.RoomBooking()).ToList();
        }
    }
}

