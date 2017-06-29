using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Hohotel.Models
{
    public class HohotelContext: DbContext
    {
        public HohotelContext(DbContextOptions<HohotelContext> options)
            : base(options)
        {
        }

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<HotelRoom> HotelRooms { get; set; }
        public DbSet<HotelRoomCategory> RoomCategories { get; set; }
        public DbSet<Dish> Dishes{ get; set; }
        public DbSet<DishPortion> DishPortions { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
