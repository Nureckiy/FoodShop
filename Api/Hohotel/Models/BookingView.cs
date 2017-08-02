using System.Collections.Generic;
using Hohotel.Models.DataModels;

namespace Hohotel.Models
{
    public class BookingView: Booking
    {
        public IList<RoomBookingView> Rooms { get; set; }
    }
}
