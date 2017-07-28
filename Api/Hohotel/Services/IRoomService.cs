using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services
{
    public interface IRoomService
    {
        IList<Room> Filter(RoomFilter filter);

        bool IsAvailable(RoomBooking roomBooking);

        Booking Book(Booking booking, string userId);

        IList<BookingView> GetUserBookings(string userId);

        IList<string> GetActive(string userId);

        void AddRoom(Room room, string userId);

        void EditRoom(Room room, string userId);

        void DeleteRoom(int id);
    }
}
