using Account_Service.DTO;
using Account_Service.Models;
using AccountService.Models;

namespace Account_Service.Repository
{
    public interface IAccountRepository
    {
        Task<(int,string)>Registeration(RegisterDTO registerDTO);
        Task<(int,string)> Login(LoginDTO loginDTO);
        Task<(int, string)> ForgotPassword(string email);
        Task<(int, string)> ResetPassword(ResetPasswordDTO resetPasswordDTO);
        Task<List<ApplicationUser>> GetAllSellers();
        Task<List<ApplicationUser>> GetAllBuyers();
        Task<ApplicationUser> GetUserById(string userId);
        Task<(int, string)> DeleteUser(string userId);
        Task<(int, string)> ApproveSeller(string userId);
        Task<(int, string)> UpdateUserLocation(string userId, UpdateUserDTO userLocationDTO);
        Task<(int, string)> RequestSellerRole(string userId);
        ////for the google auth login/registration
        //Task<(int, string)> RegisterGoogleUser(GoogleAuth googleUserDTO);
    }
}
