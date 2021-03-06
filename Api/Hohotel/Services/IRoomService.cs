﻿using System.Collections.Generic;
using Hohotel.Models;
using Hohotel.Models.DataModels;

namespace Hohotel.Services
{
    public interface IRoomService
    {
        IList<Room> Filter(RoomFilter filter);

        bool IsAvailable(RoomBooking roomBooking);

        Booking Book(Booking booking);

        IList<BookingView> GetUserBookings(string userId);

        PaginationModel<BookingView> GetBookings(int? pageNumber, int? itemsCount);

        IList<string> GetActive(string userId);

        BookingView ChangeStatus(UpdateStatusModel updateModel);

        Room AddRoom(Room room);

        Room EditRoom(Room room);

        void DeleteRoom(int id);
    }
}
