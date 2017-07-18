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
            string userId = null,
            string email = null,
            string name = null,
            string surname = null,
            string patronymic = null,
            string phone = null,
            IList<RoomBooking> roomBookings = null,
            OrderStatus orderStatus = OrderStatus.NotStarted,
            DateTime? registrationTime = null
            )
        {
            var model = new Booking()
            {
                Id = id,
                Total = total,
                UserId = userId,
                Email = email,
                Name = name,
                Surname = surname,
                Patronymic = patronymic,
                Phone = phone,
                RoomBookings = roomBookings ?? new List<RoomBooking>(),
                Status = orderStatus
            };
            if (registrationTime != null)
            {
                model.RegistrationTime = registrationTime.Value;
            }
            return model;
        }

        public static IList<Booking> Bookings(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select(e => factory.Booking()).ToList();
        }
    }
}
