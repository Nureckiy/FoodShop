using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hohotel.Migrations
{
    public partial class AddModifiedByFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "RoomCategories",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedTime",
                table: "RoomCategories",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Rooms",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedTime",
                table: "Rooms",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Dishes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedTime",
                table: "Dishes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "RoomCategories");

            migrationBuilder.DropColumn(
                name: "ModifiedTime",
                table: "RoomCategories");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "ModifiedTime",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "ModifiedTime",
                table: "Dishes");
        }
    }
}
