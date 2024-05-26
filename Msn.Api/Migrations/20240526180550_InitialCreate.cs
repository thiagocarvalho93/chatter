﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Msn.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    text = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    user = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    date_time = table.Column<DateTime>(type: "TEXT", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    email = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    hashed_password = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    nickname = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    subnick = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    image_url = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    last_online = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
