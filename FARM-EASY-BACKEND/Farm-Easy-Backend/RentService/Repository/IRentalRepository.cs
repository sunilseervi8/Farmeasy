using RentService.Model;

namespace RentService.Repository
{
    public interface IRentalRepository
    {
        Task<Rental> AddRentalAsync(Rental rental);
        Task<Rental> GetRentalByIdAsync(string id);
        Task<IEnumerable<Rental>> GetRentalsByUserIdAsync(string userId);
        Task<IEnumerable<Rental>> GetRentalsBySellerIdAsync(string sellerId); // Assuming SellerId is part of the User
        Task<IEnumerable<Rental>> GetAllRentalsAsync();
        Task<bool> ApproveRentalByIdAsync(string rentalId);
        Task<bool> DeleteRentalByIdAsync(string rentalId);
    }
}
