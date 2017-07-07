using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Hohotel.Services
{
    public class RoomService: IRoomService
    {
        private readonly HohotelContext _context;

        public RoomService(HohotelContext context)
        {
            _context = context;
        }

        public IList<Room> Filter(RoomFilter filter)
        {
            if (filter.ArrivalDate == null)
            {
                filter.ArrivalDate = DateTime.Now;
            }
            var res = _context.Rooms
                .Where(room => room.Category.Id == filter.CategoryId &&
                    (filter.DepartureDate == null ||
                    !room.RoomBookings.Any(roomBooking => 
                        filter.ArrivalDate < roomBooking.Booking.EndDate &&
                        filter.DepartureDate > roomBooking.Booking.StartDate
                    ))
                );
            return res.ToList();
        }
    }
}
