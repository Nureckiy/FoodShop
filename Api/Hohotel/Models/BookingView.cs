using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hohotel.Models.DataModels;

namespace Hohotel.Models
{
    public class BookingView: Booking
    {
        public IList<RoomBookingView> Rooms { get; set; }
    }
}
