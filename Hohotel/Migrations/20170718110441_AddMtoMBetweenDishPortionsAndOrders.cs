using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hohotel.Migrations
{
    public partial class AddMtoMBetweenDishPortionsAndOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishPortions_Orders_OrderId",
                table: "DishPortions");

            migrationBuilder.DropIndex(
                name: "IX_DishPortions_OrderId",
                table: "DishPortions");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "DishPortions");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Bookings",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Bookings",
                newName: "RegistrationTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "RoomBooking",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "RoomBooking",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Patronymic",
                table: "Bookings",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DishPortionOrder",
                columns: table => new
                {
                    DishPortionId = table.Column<int>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    Count = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DishPortionOrder", x => new { x.DishPortionId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_DishPortionOrder_DishPortions_DishPortionId",
                        column: x => x.DishPortionId,
                        principalTable: "DishPortions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DishPortionOrder_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DishPortionOrder_OrderId",
                table: "DishPortionOrder",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DishPortionOrder");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "RoomBooking");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "RoomBooking");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Patronymic",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Bookings",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "RegistrationTime",
                table: "Bookings",
                newName: "StartDate");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "DishPortions",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Bookings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_DishPortions_OrderId",
                table: "DishPortions",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_DishPortions_Orders_OrderId",
                table: "DishPortions",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
