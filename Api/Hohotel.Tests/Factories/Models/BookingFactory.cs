using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Enums;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class BookingFactory
    {
        public static Booking Booking(this ITestDataFactory factory,
            int id = 0,
            decimal total = 0,
            DateTime? startDate = null,
            DateTime? endDate = null,
            string userId = null,
            string userName = null,
            string phone = null,
            IList<RoomBooking> roomBookings = null,
            OrderStatus orderStatus = OrderStatus.NotStarted
            )
        {
            var model = new Booking()
            {
                Id = id,
                Total = total,
                UserId = userId,
                UserName = userName,
                Phone = phone,
                RoomBookings = roomBookings ?? new List<RoomBooking>(),
                Status = orderStatus
            };
            if (startDate != null)
            {
                model.StartDate = startDate.Value;
            }
            if (endDate != null)
            {
                model.EndDate = endDate.Value;
            }
            return model;
        }

        public static IList<Booking> Bookings(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(e => factory.Booking()).ToList();
        }
    }
}
