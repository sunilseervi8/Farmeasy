using Account_Service.DTO;
using Account_Service.Models;
using Account_Service.Repository;
using AccountService.Models;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Account_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _authRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(IAccountRepository authRepository, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _authRepository = authRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

       
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var (statusCode, message) = await _authRepository.Registeration(registerDTO);
            if (statusCode != 200)
            {
                return StatusCode(statusCode, new { Message = message });
            }

            return Ok(new { Message = message });
        }

        //login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var (statusCode, message) = await _authRepository.Login(loginDTO);
            if (statusCode != 200)
            {
                return StatusCode(statusCode, new { Message = message });
            }

            return Ok(new {  message });
        }
        //request seller role
        [HttpPost("request-seller-role/{userId}")]
        //[Authorize]  // Ensure the user is authenticated
        public async Task<IActionResult> RequestSellerRole(string userId)
        {
            var (statusCode, message) = await _authRepository.RequestSellerRole(userId);
            if (statusCode != 200)
            {
                return StatusCode(statusCode, new { Message = message });
            }

            return Ok(new { Message = message });
        }
        //forgot passswor logic
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string Email)
        {
            var (statusCode, message) = await _authRepository.ForgotPassword(Email);
            return StatusCode(statusCode, new { Message = message });
        }
        //reset password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var (statusCode, message) = await _authRepository.ResetPassword(resetPasswordDTO);
            if (statusCode != 200)
            {
                return StatusCode(statusCode, new { Message = message });
            }

            return Ok(new { Message = message });
        }

        //get all the selleers
        //[Authorize(Roles = "Admin")]
        [HttpGet("all-sellers")]
        public async Task<ActionResult<List<ApplicationUser>>> GetAllSellers()
        {
            var sellers = await _authRepository.GetAllSellers();
            return Ok(sellers);
        }
        //get all the user=buyer
        [HttpGet("all-buyers")]
        public async Task<ActionResult<List<ApplicationUser>>> GetAll()
        {
            var Buyer = await _authRepository.GetAllBuyers();
            return Ok(Buyer);
        }
        //get user by id
        [HttpGet("user/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUserById(string id)
        {
            var user = await _authRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            return Ok("Succesfully Deleted");
        }
        //delete the user
        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var (statusCode, message) = await _authRepository.DeleteUser(id);
            return StatusCode(statusCode, new { Message = message });
        }
        //approve the seller
        //[Authorize(Roles = "Admin")]
        [HttpPost("approve-seller/{id}")]
        public async Task<IActionResult> ApproveSeller(string id)
        {
            var (statusCode, message) = await _authRepository.ApproveSeller(id);
            return StatusCode(statusCode, new { Message = message });
        }

        [HttpPut("update-location/{userId}")]
        public async Task<IActionResult> UpdateUserLocation(string userId, [FromBody] UpdateUserDTO userLocationDTO)
        {
            var (statusCode, message) = await _authRepository.UpdateUserLocation(userId, userLocationDTO);

            if (statusCode != 200)
            {
                return StatusCode(statusCode, new { Message = message });
            }

            return Ok(new { Message = message });
        }
 
    }
}
