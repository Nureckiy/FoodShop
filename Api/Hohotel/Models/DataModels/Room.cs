using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hohotel.Models.DataModels
{
    public class Room
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public RoomCategory Category { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public virtual IList<RoomBooking> RoomBookings { get; set; }
    }
}
