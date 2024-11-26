using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RentService.Migrations
{
    /// <inheritdoc />
    public partial class Database : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rentals",
                columns: table => new
                {
                    RentalId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RentalTitle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RentalDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ReantalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RentalLocation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RentalNumberPlate = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    RentalImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RentalIsApproved = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rentals", x => x.RentalId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rentals");
        }
    }
}
