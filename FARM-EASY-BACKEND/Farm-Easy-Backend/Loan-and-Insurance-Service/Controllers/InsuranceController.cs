using Loan_and_Insurance_Service.DataAccess;
using Loan_and_Insurance_Service.Models;
using Loan_and_Insurance_Service.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loan_and_Insurance_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Protect with JWT token
    public class InsuranceController : ControllerBase
    {
        private readonly LoanAndInsuranceDBContext _context;

        public InsuranceController(LoanAndInsuranceDBContext context)
        {
            _context = context;
        }

        [HttpGet("insurances")]
        public async Task<IActionResult> GetAllInsuranceApplications()
        {
            var insurances = await _context.InsuranceApplications.ToListAsync();
            return Ok(insurances);
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyForInsurance([FromBody] INsuranceApplication insuranceApplication)
        {
            if (insuranceApplication == null) return BadRequest("Invalid insurance application data.");

            insuranceApplication.Status = "Pending";
            _context.InsuranceApplications.Add(insuranceApplication);
            await _context.SaveChangesAsync();

            return Ok(new { status = "Application submitted" });
        }

        [HttpPost("calculate")]
        public IActionResult CalculateInsurance([FromBody] InsuranceRequest request)
        {
            if (request == null) return BadRequest("Invalid insurance request data.");

            var insurance = CalculateInsuranceForMachinery(request.MachineryId);
            return Ok(insurance);
        }

        private Insurance CalculateInsuranceForMachinery(int machineryId)
        {
            return new Insurance
            {
                PolicyName = "Machinery Protection Plan",
                PremiumAmount = 500M,
                IsEligible = true,
                ProviderName = "FarmProtect"
            };
        }
    }

}
