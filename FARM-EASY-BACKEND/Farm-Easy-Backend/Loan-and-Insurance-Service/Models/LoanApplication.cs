using System.ComponentModel.DataAnnotations;

namespace Loan_and_Insurance_Service.Models
{
    public class LoanApplication
    {
        [Key]
        public int ApplicationId { get; set; }
        public int UserId { get; set; }
        public int MachineryId { get; set; }
        public decimal RequestedAmount { get; set; }
        public int TermInYears { get; set; }
        public string Status { get; set; }
    }
}
