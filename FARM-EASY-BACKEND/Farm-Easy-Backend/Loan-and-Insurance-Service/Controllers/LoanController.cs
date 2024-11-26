using Loan_and_Insurance_Service.DataAccess;
using Loan_and_Insurance_Service.Models;
using Loan_and_Insurance_Service.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;

namespace Loan_and_Insurance_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Protect with JWT token
    public class LoanController : ControllerBase
    {
        private readonly LoanAndInsuranceDBContext _context;

        public LoanController(LoanAndInsuranceDBContext context)
        {
            _context = context;
        }

        [HttpGet("loans")]
        public async Task<IActionResult> GetAllLoanApplications()
        {
            var loans = await _context.LoanApplications.ToListAsync();
            return Ok(loans);
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyForLoan([FromBody] LoanApplication loanApplication)
        {
            if (loanApplication == null) return BadRequest("Invalid loan application data.");

            loanApplication.Status = "Pending";
            _context.LoanApplications.Add(loanApplication);
            await _context.SaveChangesAsync();

            return Ok(new { status = "Application submitted" });
        }

        [HttpPost("calculate")]
        public IActionResult CalculateLoan([FromBody] LoanRequest request)
        {
            if (request == null) return BadRequest("Invalid loan request data.");

            var loan = CalculateLoanForMachinery(request.MachineryPrice, request.BuyerCreditScore);
            return Ok(loan);
        }

        private Loan CalculateLoanForMachinery(decimal machineryPrice, int buyerCreditScore)
        {
            return new Loan
            {
                Amount = machineryPrice * 0.9M,
                TermInYears = 5,
                InterestRate = buyerCreditScore > 650 ? 5.0f : 6.5f,
                IsApproved = buyerCreditScore > 650,
                ProviderName = "AgriBank"
            };
        }
    }
}
