using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hohotel.Migrations
{
    public partial class UpdateOrderStatusInfoFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishPortions_Dishes_ParentId",
                table: "DishPortions");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_RoomCategories_CategoryId",
                table: "Rooms");

            migrationBuilder.AddColumn<string>(
                name: "StatusUpdatedBy",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StatusUpdatedDate",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusUpdatedBy",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StatusUpdatedDate",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DishPortions_Dishes_ParentId",
                table: "DishPortions",
                column: "ParentId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_RoomCategories_CategoryId",
                table: "Rooms",
                column: "CategoryId",
                principalTable: "RoomCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishPortions_Dishes_ParentId",
                table: "DishPortions");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_RoomCategories_CategoryId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "StatusUpdatedBy",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "StatusUpdatedDate",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "StatusUpdatedBy",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StatusUpdatedDate",
                table: "Bookings");

            migrationBuilder.AddForeignKey(
                name: "FK_DishPortions_Dishes_ParentId",
                table: "DishPortions",
                column: "ParentId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_RoomCategories_CategoryId",
                table: "Rooms",
                column: "CategoryId",
                principalTable: "RoomCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
