using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Hohotel.Models;
using Hohotel.Enums;

namespace Hohotel.Migrations
{
    [DbContext(typeof(HohotelContext))]
    partial class HohotelContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Hohotel.Models.DataModels.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Patronymic");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("RegistrationTime");

                    b.Property<int>("Status");

                    b.Property<string>("StatusUpdatedBy");

                    b.Property<DateTime?>("StatusUpdatedDate");

                    b.Property<string>("Surname");

                    b.Property<decimal>("Total");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Dish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Category");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime?>("CreatedTime");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("ModifiedBy");

                    b.Property<DateTime?>("ModifiedTime");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Dishes");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.DishPortion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ParentId");

                    b.Property<decimal>("Price");

                    b.Property<string>("Size");

                    b.Property<string>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("DishPortions");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.DishPortionOrder", b =>
                {
                    b.Property<int>("DishPortionId");

                    b.Property<int>("OrderId");

                    b.Property<int>("Count");

                    b.HasKey("DishPortionId", "OrderId");

                    b.HasIndex("OrderId");

                    b.ToTable("DishPortionOrder");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("CheckoutDate");

                    b.Property<DateTime?>("CompletionDate");

                    b.Property<string>("Phone");

                    b.Property<int>("Status");

                    b.Property<string>("StatusUpdatedBy");

                    b.Property<DateTime?>("StatusUpdatedDate");

                    b.Property<string>("Surname");

                    b.Property<bool>("TakeAway");

                    b.Property<decimal>("Total");

                    b.Property<string>("UserId");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<int?>("CategoryId");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime?>("CreatedTime");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("ModifiedBy");

                    b.Property<DateTime?>("ModifiedTime");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.RoomBooking", b =>
                {
                    b.Property<int>("RoomId");

                    b.Property<int>("BookingId");

                    b.Property<DateTime?>("EndDate");

                    b.Property<DateTime?>("StartDate");

                    b.HasKey("RoomId", "BookingId");

                    b.HasIndex("BookingId");

                    b.ToTable("RoomBooking");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.RoomCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CoverUrl");

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime?>("CreatedTime");

                    b.Property<string>("Description");

                    b.Property<int>("GuestsNumber");

                    b.Property<string>("ModifiedBy");

                    b.Property<DateTime?>("ModifiedTime");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("RoomCategories");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.DishPortion", b =>
                {
                    b.HasOne("Hohotel.Models.DataModels.Dish", "Parent")
                        .WithMany("DishPortions")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.DishPortionOrder", b =>
                {
                    b.HasOne("Hohotel.Models.DataModels.DishPortion", "DishPortion")
                        .WithMany("DishPortionOrders")
                        .HasForeignKey("DishPortionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Hohotel.Models.DataModels.Order", "Order")
                        .WithMany("DishPortionOrders")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Room", b =>
                {
                    b.HasOne("Hohotel.Models.DataModels.RoomCategory", "Category")
                        .WithMany("Rooms")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.RoomBooking", b =>
                {
                    b.HasOne("Hohotel.Models.DataModels.Booking", "Booking")
                        .WithMany("RoomBookings")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Hohotel.Models.DataModels.Room", "Room")
                        .WithMany("RoomBookings")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
