using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Hohotel.Enums;
using Hohotel.Models;
using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Hohotel.Services
{
    public class RoomService: IRoomService
    {
        private readonly HohotelContext _context;
        private readonly IMapper _mapper;

        public RoomService(HohotelContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
            booking.RoomBookings.ToList()
                .ForEach(roomBooking => 
                    roomBooking.Room = _context.Rooms.Single(room => room.Id == roomBooking.RoomId));
            booking.Total = CountTotal(booking.RoomBookings.ToList());
            booking.UserId = userId;
            _context.Bookings.Add(booking);
            _context.SaveChanges();
            return booking;
        }

        public IList<BookingView> GetUserBookings(string userId)
        {
            return _context.Bookings
                .Where(booking => booking.UserId == userId)
                .ProjectTo<BookingView>(_mapper)
                .ToList();
        }

        public IList<string> GetActive(string userId)
        {
            var now = DateTime.Now;
            return _context.Rooms
                .Include("RoomBookings")
                .Where(room => room.RoomBookings.Any(booking =>
                    booking.Booking.UserId == userId &&
                    booking.Booking.Status == OrderStatus.Opened &&
                    booking.StartDate <= now
                    && booking.EndDate >= now))
                .Select(room => room.Address)
                .ToList();
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
