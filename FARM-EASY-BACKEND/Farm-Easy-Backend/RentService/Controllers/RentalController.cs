using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentService.CustomException;
using RentService.DataAccess;
using RentService.Model;
using RentService.Repository;

namespace RentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly IRentalRepository _rentalRepository;
        public RentalController(IRentalRepository rentalRepository)
        {
            _rentalRepository = rentalRepository;
        }
        [HttpPost]
        public async Task<ActionResult<Rental>> PsotRental(Rental rental)
        {
            try
            {
                var createdRental = await _rentalRepository.AddRentalAsync(rental);
                return CreatedAtAction(nameof(GetRental), new { id = createdRental.RentalId }, createdRental);
            }
            catch (RentalServiceException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(string id)
        {
            try
            {
                var rental = await _rentalRepository.GetRentalByIdAsync(id);
                if (rental == null)
                {
                    throw new RentalServiceException("Rental not found.");
                }
                return Ok(rental);
            }
            catch (RentalServiceException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalByUserId(string userId)
        {
            try
            {
                var rentals = await _rentalRepository.GetRentalsByUserIdAsync(userId);
                return Ok(rentals);
            }
            catch (RentalServiceException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet("seller/{sellerID}")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalsBySellerId(string sellerID)
        {
            try
            {
                var rentals = await _rentalRepository.GetRentalsBySellerIdAsync(sellerID);
                return Ok(rentals);
            }
            catch (RentalServiceException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> GetAllRentals()
        {
            try
            {
                var rentals = await _rentalRepository.GetAllRentalsAsync();
                return Ok(rentals);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveRental(string id)
        {
            try
            {
                var isApproved = await _rentalRepository.ApproveRentalByIdAsync(id);
                if (!isApproved)
                {
                    throw new RentalServiceException("Rental not found or already approved.");
                }
                return Ok(new { Message = "Rental approved successfully." });
            }
            catch (RentalServiceException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(string id)
        {
            try
            {
                var isDeleted = await _rentalRepository.DeleteRentalByIdAsync(id);
                if (!isDeleted)
                {
                    throw new RentalServiceException("Rental not found.");
                }
                return Ok(new { Message = "Rental deleted successfully." });
            }
            catch (RentalServiceException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An unexpected error occurred.", Error = ex.Message });
            }
        }

    }
}
