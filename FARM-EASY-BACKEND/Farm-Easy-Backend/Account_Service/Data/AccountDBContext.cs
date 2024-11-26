using Account_Service.Models;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Account_Service.Data
{
    public class AccountDBContext:IdentityDbContext<ApplicationUser>
    {
        public AccountDBContext(DbContextOptions<AccountDBContext> options): base(options)
        {
        }

        public DbSet<UserLocation> UserLocation { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure one-to-one relationship if needed (if a user can have only one location)
            modelBuilder.Entity<UserLocation>()
                .HasOne(ul => ul.ApplicationUser)
                .WithOne()
                .HasForeignKey<UserLocation>(ul => ul.UserId)
                .OnDelete(DeleteBehavior.Cascade);  // Optional: Defines what happens if the User is deleted
        }
    }
}
