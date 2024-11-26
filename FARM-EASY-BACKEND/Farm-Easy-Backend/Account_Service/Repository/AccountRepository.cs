using Account_Service.Data;
using Account_Service.DTO;
using Account_Service.Models;
using AccountService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Account_Service.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AccountDBContext _context;
        private readonly IEmailSender _emailSender;
        public readonly IConfiguration _configuration;

        public AccountRepository(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
             IConfiguration configuration,
             IEmailSender emailSender,
            AccountDBContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        public async Task<(int, string)> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return (404, "User not found.");
            }
            if (user!=null && user.ModeOfSign!= "mannual")
            {
                if (user.ModeOfSign == "google")
                {
                    return (401, "You have sign in with google");
                }
                else
                {
                    return (404, "User not found.");
                }
            }
            var result = await _signInManager.PasswordSignInAsync(user, loginDTO.Password, false, false);
            if (!result.Succeeded)
            {
                return (401, "Invalid credentials.");
            }
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
           {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name,user.FullName),
                new Claim(ClaimTypes.GivenName,user.ProfileImg),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            string token = GenerateToken(authClaims);
            return (200, token);  // Return the JWT token
        }
 
        public async Task<(int, string)> Registeration(RegisterDTO registerDTO)
        {
            // Check if user exists
            var existingUser = await _userManager.FindByEmailAsync(registerDTO.Email);
            if (existingUser != null)
            {
                return (400, "User with this email already exists.");
            }
            var user = new ApplicationUser
            {
                UserName = registerDTO.Email,
                Email = registerDTO.Email,
                FullName = registerDTO.FullName,
                PhoneNumber = registerDTO.PhoneNumber,
                IsVerified = registerDTO.Role == "seller" ? false : true,
                ModeOfSign = "mannual"

            };

         
            // Assign the role
            var role = registerDTO.Role ?? Roles.User; // Default role is 'User'
            if (role == Roles.User || role == Roles.Admin || role == Roles.Seller)
            {
                //if role are valid then create the user
                var result = await _userManager.CreateAsync(user, registerDTO.Password);
                if (!result.Succeeded)
                {
                    return (401, string.Join(", ", result.Errors.Select(e => e.Description)));
                }
                // Save User Location (after user creation)
                var location = new UserLocation
                {
                    UserId = user.Id,  
                    Address = "",
                    City = "",
                    State = "",
                    ZipCode = "",
                    Country = ""
                };
                _context.UserLocation.Add(location);
                await _context.SaveChangesAsync();
                //to check role
                if (!await _roleManager.RoleExistsAsync(role) )
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
                           
                await _userManager.AddToRoleAsync(user, role);
                return (200, "User registered successfully.");
            }
            return (400, "Unauthorized Access");
        }


        //multiple role
        public async Task<(int, string)> RequestSellerRole(string userId)
        {   // Find the user by their ID
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return (404, "User not found.");
            }
            // Check if the user is already a seller
            var isAlreadySeller = await _userManager.IsInRoleAsync(user, Roles.Seller);
            if (isAlreadySeller)
            {
                return (400, "User is already a seller.");
            }
            // Add the seller role
            var sellerRole = Roles.Seller;
            if (!await _roleManager.RoleExistsAsync(sellerRole))
            {
                await _roleManager.CreateAsync(new IdentityRole(sellerRole));
            }
            await _userManager.AddToRoleAsync(user, sellerRole);
            // Optional: Mark user as not verified until admin approves
            user.IsVerified = false;
            await _userManager.UpdateAsync(user);
            return (200, "Seller rWInole Wrequested. Pending admin approval.");
        }

        //fortgot password reseyt link smtp
        public async Task<(int, string)> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return (404, "User not found.");
            }
            // Generate password reset token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // Create the reset link
            var resetLink = $"http://localhost:5173/resetpassword/?token={(token)}&email={email}";
            // Send email with the reset link
            await _emailSender.SendEmailAsync(email, "Password Reset Request",
                $"Please reset your password by clicking this link: <a href={resetLink}>Reset Password</a>");
            return (200, "Password reset link has been sent to your email.token${token}");
        }
        //reset link after redirectikon
        public async Task<(int, string)> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            Console.WriteLine("sfghjxdfghjikjhgfdxfghuiygtfdgyhui",resetPasswordDTO.Token);
           
            var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);  
            if (user == null)
            {
                return (404, "User not found.");
            }
            // Reset password using the token
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.NewPassword);
            if (!result.Succeeded)
            {
                return (500, string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return (200, "Password has been successfully reset.");
        }

        // Get All Sellers
        public async Task<List<ApplicationUser>> GetAllSellers()
        {
            return (await _userManager.GetUsersInRoleAsync("seller")).ToList();
        }

        // Get All Buyers
        public async Task<List<ApplicationUser>> GetAllBuyers()
        {
            return (await _userManager.GetUsersInRoleAsync("buyer")).ToList();
        }
        // Get User By ID
        public async Task<ApplicationUser> GetUserById(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }


        // Delete User
        public async Task<(int, string)> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return (404, "User not found.");
            }
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return (500, "Failed to delete user. " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return (200, "User deleted successfully.");
        }


        // Approve Seller
        public async Task<(int, string)> ApproveSeller(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return (404, "User not found.");
            }

            var isSeller = await _userManager.IsInRoleAsync(user, "seller");
            if (!isSeller)
            {
                return (400, "User is not a seller.");
            }

            user.IsVerified = true;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return (500, "Failed to approve seller.");
            }

            return (200, "Seller approved successfully.");
        }
        public async Task<(int, string)> UpdateUserLocation(string userId, UpdateUserDTO userLocationDTO)
        {
            // Find the user by userId
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return (404, "User not found.");
            }

            // Fetch the user's location using the userId
            var userLocation = await _context.UserLocation.FirstOrDefaultAsync(ul => ul.UserId == userId);
            if (userLocation == null)
            {
                return (404, "User location not found.");
            }
            // Update location details
            userLocation.Address = userLocationDTO.Address;
            userLocation.City = userLocationDTO.City;
            userLocation.State = userLocationDTO.State;
            userLocation.ZipCode = userLocationDTO.ZipCode;
            userLocation.Country = userLocationDTO.Country;
            userLocation.updateAt = DateTime.UtcNow;
            // Save changes to the database
            _context.UserLocation.Update(userLocation);
            await _context.SaveChangesAsync();
            return (200, "User location updated successfully.");
        }


        //jwt
        private string GenerateToken(IEnumerable<Claim> claims)
        {

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };
            // Console.WriteLine(tokenDescriptor);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
