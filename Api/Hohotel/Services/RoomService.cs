using System;
using System.Collections.Generic;
using System.Linq;
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
            if (filter.StartDate == null)
            {
                filter.StartDate = DateTime.Now;
            }
            var res = _context.Rooms
                .Include("Category")
                .Where(room => room.Category.Id == filter.CategoryId &&
                               (filter.EndDate == null ||
                                !room.RoomBookings.Any(roomBooking =>
                                    (roomBooking.Booking.Status == OrderStatus.NotStarted || roomBooking.Booking.Status == OrderStatus.Opened) &&
                                    filter.StartDate < roomBooking.EndDate &&
                                    filter.EndDate > roomBooking.StartDate
                                ))
                );
            return res.ToList();
        }

        public bool IsAvailable(RoomBooking roomBooking)
        {
            if (roomBooking.EndDate == null || roomBooking.StartDate == null)
            {
                throw new ArgumentException("Date range is not correct");
            }
            var isAvailable = !_context.Rooms.Any(room => 
                 room.Id == roomBooking.RoomId && room.RoomBookings.Any(booking =>
                    (booking.Booking.Status == OrderStatus.NotStarted ||
                    booking.Booking.Status == OrderStatus.Opened) &&
                    roomBooking.StartDate < booking.EndDate &&
                    roomBooking.EndDate > booking.StartDate
                ));
            return isAvailable;
        }

        public Booking Book(Booking booking, string userId)
        {
            foreach (var roomBooking in booking.RoomBookings)
            {
                roomBooking.Room = _context.Rooms.Single(room => room.Id == roomBooking.RoomId);
            }
            booking.Total = CountTotal(booking.RoomBookings.ToList());
            booking.UserId = userId;
            _context.Bookings.Add(booking);
            _context.SaveChanges();
            return booking;
        }

        public decimal CountTotal(List<RoomBooking> roomBookings)
        {
            return roomBookings.Sum(roomBooking => CountTotal(roomBooking));
        }

        public decimal CountTotal(RoomBooking booking)
        {
            var bookingDateRange = (booking.EndDate - booking.StartDate);
            return booking.Room.Price * bookingDateRange.Value.Days;
        } 
    }
}
