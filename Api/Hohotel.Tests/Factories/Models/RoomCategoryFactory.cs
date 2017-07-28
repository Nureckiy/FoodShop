using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Hohotel.Models.DataModels;

namespace Hohotel.Tests.Factories.Models
{
    public static class RoomCategoryFactory
    {
        public static RoomCategory RoomCategory(this ITestDataFactory factory,
            int id = 0,
            string name = null,
            int guestsNumber = 0,
            string description = null,
            string coverUrl = null,
            IList<Room> rooms = null)
        {
            var model = new RoomCategory()
            {
                Id = id,
                Name = name,
                GuestsNumber = guestsNumber,
                Description = description,
                CoverUrl = coverUrl,
                Rooms = rooms ?? new List<Room>()
            };
            return model;
        }

        public static IList<RoomCategory> RoomCategories(this ITestDataFactory factory, int count)
        {
            return Enumerable.Range(0, count).Select((e, index) => factory.RoomCategory(index)).ToList();
        }
    }
}
