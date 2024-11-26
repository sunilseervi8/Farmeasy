using Microsoft.EntityFrameworkCore;
using RentService.DataAccess;
using RentService.Model;

namespace RentService.Repository
{
    public class RentalRepository : IRentalRepository
    {
        private readonly RentalDBContext _context;
        public RentalRepository(RentalDBContext context) 
        {
            _context = context;
        }
        //Add new rental
        public async Task<Rental> AddRentalAsync(Rental rental)
        {
            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();
            return rental;
        }
        //Get rental by Id
        public async Task<Rental> GetRentalByIdAsync(string id)
        {
            return await _context.Rentals
                .FirstOrDefaultAsync(r => r.RentalId == id);
        }
        //Get rentals by UserId (for renters)
        public async Task<IEnumerable<Rental>> GetRentalsByUserIdAsync(string userId)
        {
            return await _context.Rentals
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }
        //Get rentals by SellerId
        public async Task<IEnumerable<Rental>> GetRentalsBySellerIdAsync(string sellerId)
        {
            return await _context.Rentals
                .Where(r => r.UserId == sellerId)
                .ToListAsync();
        }
        //Get all rentals
        public async Task<IEnumerable<Rental>> GetAllRentalsAsync()
        {
            return await _context.Rentals
                .ToListAsync();
        }
        //Approve a rental by Id
        public async Task<bool> ApproveRentalByIdAsync(string rentalId)
        {
            var rental = await _context.Rentals.FindAsync(rentalId);
            if (rental != null && !rental.RentalIsApproved)
            {
                rental.RentalIsApproved = true; 
                _context.Rentals.Update(rental);
                await _context.SaveChangesAsync();
                return true; 
            }

            return false;
        }
        // Delete rental by Id
        public async Task<bool> DeleteRentalByIdAsync(string rentalId)
        {
            var rental = await _context.Rentals.FindAsync(rentalId);
            if (rental != null)
            {
                _context.Rentals.Remove(rental);
                await _context.SaveChangesAsync();
                return true; // Rental successfully deleted
            }
            return false; // Rental not found
        }
    }
}
