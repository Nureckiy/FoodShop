using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hohotel.Models.DataModels
{
    public class RoomBooking
    {
        public int RoomId { get; set; }
        public Room Room { get; set; }

        public int BookingId { get; set; }
        public Booking Booking { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
