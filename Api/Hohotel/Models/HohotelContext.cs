using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;

namespace Hohotel.Models
{
    public class HohotelContext: DbContext
    {
        public HohotelContext(DbContextOptions options) : base(options)
        {
        }

        public HohotelContext()
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<RoomCategory> RoomCategories { get; set; }
        public virtual DbSet<Dish> Dishes{ get; set; }
        public virtual DbSet<DishPortion> DishPortions { get; set; }
        public virtual DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //define m-m relationship between Rooms and Bookings tables

            modelBuilder.Entity<RoomBooking>()
                .HasKey(k => new { k.RoomId, k.BookingId });

            modelBuilder.Entity<RoomBooking>()
                .HasOne(rb => rb.Room)
                .WithMany(r => r.RoomBookings)
                .HasForeignKey(rb => rb.RoomId);

            modelBuilder.Entity<RoomBooking>()
                .HasOne(rb => rb.Booking)
                .WithMany(b => b.RoomBookings)
                .HasForeignKey(rb => rb.BookingId);
        }
    }
}
