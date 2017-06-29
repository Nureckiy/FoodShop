using System;
using System.Collections.Generic;
using Hohotel.Enums;

namespace Hohotel.Models.DataModels
{
    public class Booking
    {
        public int Id { get; set; }
        public decimal Total { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public virtual IEnumerable<HotelRoom> Rooms { get; set; }
        public OrderStatus Status { get; set; }
    }
}
