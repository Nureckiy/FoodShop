using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class RoomFactory
    {
        public static Room Room(this ITestDataFactory factory,
            int id = 0,
            RoomCategory category = null,
            string address = null,
            string description = null,
            string imageUrl = null,
            decimal price = 0,
            IList<RoomBooking> roomBookings = null
        )
        {
            var model = new Room()
            {
                Id = id,
                Category = category ?? TestData.Create.RoomCategory(),
                Address = address,
                Description = description,
                ImageUrl = imageUrl,
                Price = price,
                RoomBookings = roomBookings ?? new List<RoomBooking>()
            };
            return model;
        }

        public static IList<Room> Rooms(this ITestDataFactory factory, int count, RoomCategory category = null)
        {
            return Enumerable.Range(0, count).Select(index => factory.Room(index, category)).ToList();
        }
    }
}
