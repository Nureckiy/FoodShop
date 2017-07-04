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
    [Migration("20170704085109_EditRoomCategoryModel")]
    partial class EditRoomCategoryModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Hohotel.Models.DataModels.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<string>("Phone");

                    b.Property<DateTime>("StartDate");

                    b.Property<int>("Status");

                    b.Property<decimal>("Total");

                    b.Property<string>("UserId");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Dish", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Category");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Dishes");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.DishPortion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("OrderId");

                    b.Property<int?>("ParentId");

                    b.Property<decimal>("Price");

                    b.Property<string>("Size");

                    b.Property<double?>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ParentId");

                    b.ToTable("DishPortions");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("CheckoutDate");

                    b.Property<DateTime>("CompletionDate");

                    b.Property<string>("Phone");

                    b.Property<int>("Status");

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

                    b.Property<int?>("BookingId");

                    b.Property<int?>("CategoryId");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.RoomCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CoverUrl");

                    b.Property<string>("Description");

                    b.Property<int>("GuestsNumber");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("RoomCategories");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.DishPortion", b =>
                {
                    b.HasOne("Hohotel.Models.DataModels.Order")
                        .WithMany("Dishes")
                        .HasForeignKey("OrderId");

                    b.HasOne("Hohotel.Models.DataModels.Dish", "Parent")
                        .WithMany("DishPortions")
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("Hohotel.Models.DataModels.Room", b =>
                {
                    b.HasOne("Hohotel.Models.DataModels.Booking")
                        .WithMany("Rooms")
                        .HasForeignKey("BookingId");

                    b.HasOne("Hohotel.Models.DataModels.RoomCategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });
        }
    }
}
