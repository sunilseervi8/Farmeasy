using Loan_and_Insurance_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace Loan_and_Insurance_Service.DataAccess
{
    public class LoanAndInsuranceDBContext: DbContext
    {
        public LoanAndInsuranceDBContext(DbContextOptions<LoanAndInsuranceDBContext>options) : base(options){ }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
  
        public DbSet<LoanApplication> LoanApplications { get; set; }
        public DbSet<INsuranceApplication> InsuranceApplications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Loan>()
         .Property(l => l.LoanId)
         .ValueGeneratedOnAdd();
        }
 
    }
}
