using Loan_and_Insurance_Service.DataAccess;
using Loan_and_Insurance_Service.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loan_and_Insurance_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")] // Require "Admin" role
    public class AdminController : ControllerBase
    {
        private readonly LoanAndInsuranceDBContext _context;

        public AdminController(LoanAndInsuranceDBContext context)
        {
            _context = context;
        }

        [HttpGet("loans")]
        public async Task<IActionResult> GetAllLoanApplications()
        {
            var loans = await _context.LoanApplications.ToListAsync();
            return Ok(loans);
        }

        [HttpPost("loans/update-status")]
        public async Task<IActionResult> UpdateLoanStatus([FromBody] LoanApplication loanApplication)
        {
            var existingLoan = await _context.LoanApplications.FindAsync(loanApplication.ApplicationId);
            if (existingLoan == null) return NotFound("Loan application not found.");

            existingLoan.Status = loanApplication.Status;
            await _context.SaveChangesAsync();

            return Ok(existingLoan);
        }

        [HttpGet("insurances")]
        public async Task<IActionResult> GetAllInsuranceApplications()
        {
            var insurances = await _context.InsuranceApplications.ToListAsync();
            return Ok(insurances);
        }

        [HttpPost("insurances/update-status")]
        public async Task<IActionResult> UpdateInsuranceStatus([FromBody] INsuranceApplication insuranceApplication)
        {
            var existingInsurance = await _context.InsuranceApplications.FindAsync(insuranceApplication.ApplicationId);
            if (existingInsurance == null) return NotFound("Insurance application not found.");

            existingInsurance.Status = insuranceApplication.Status;
            await _context.SaveChangesAsync();

            return Ok(existingInsurance);
        }
    }

}
