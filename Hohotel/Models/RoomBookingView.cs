using System;
using Hohotel.Models.DataModels;

namespace Hohotel.Models
{
    public class RoomBookingView
    {
        public int Id { get; set; }
        public RoomCategory Category { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
