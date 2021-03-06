﻿using Hohotel.Models.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
        public virtual DbSet<Dish> Dishes { get; set; }
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

            //define m-m relationship between DishProtions and Orders tables
            modelBuilder.Entity<DishPortionOrder>()
                .HasKey(k => new { k.DishPortionId, k.OrderId });

            modelBuilder.Entity<DishPortionOrder>()
                .HasOne(rb => rb.DishPortion)
                .WithMany(r => r.DishPortionOrders)
                .HasForeignKey(rb => rb.DishPortionId);

            modelBuilder.Entity<DishPortionOrder>()
                .HasOne(rb => rb.Order)
                .WithMany(b => b.DishPortionOrders)
                .HasForeignKey(rb => rb.OrderId);

            //enable cascade delete rooms items
            modelBuilder.Entity<Room>()
                .HasOne(r => r.Category)
                .WithMany(c => c.Rooms)
                .OnDelete(DeleteBehavior.Cascade);

            //enable cascade delete dishPortion items
            modelBuilder.Entity<DishPortion>()
                .HasOne(r => r.Parent)
                .WithMany(c => c.DishPortions)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
