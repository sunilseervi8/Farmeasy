using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loan_and_Insurance_Service.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreationjh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MachineryPurchases");

            migrationBuilder.CreateTable(
                name: "InsuranceApplications",
                columns: table => new
                {
                    ApplicationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    MachineryId = table.Column<int>(type: "int", nullable: false),
                    PolicyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PremiumAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceApplications", x => x.ApplicationId);
                });

            migrationBuilder.CreateTable(
                name: "LoanApplications",
                columns: table => new
                {
                    ApplicationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    MachineryId = table.Column<int>(type: "int", nullable: false),
                    RequestedAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TermInYears = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanApplications", x => x.ApplicationId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InsuranceApplications");

            migrationBuilder.DropTable(
                name: "LoanApplications");

            migrationBuilder.CreateTable(
                name: "MachineryPurchases",
                columns: table => new
                {
                    PurchaseId = table.Column<int>(type: "int", nullable: false),
                    IsInsuranceOpted = table.Column<bool>(type: "bit", nullable: false),
                    IsLoanApplied = table.Column<bool>(type: "bit", nullable: false),
                    MachineryId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineryPurchases", x => x.PurchaseId);
                    table.ForeignKey(
                        name: "FK_MachineryPurchases_Insurances_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Insurances",
                        principalColumn: "InsuranceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MachineryPurchases_Loans_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Loans",
                        principalColumn: "LoanId",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
