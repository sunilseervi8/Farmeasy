using System.ComponentModel.DataAnnotations;

namespace Loan_and_Insurance_Service.Models
{
    public class INsuranceApplication
    {
        [Key]
        public int ApplicationId { get; set; }
        public int UserId { get; set; }
        public int MachineryId { get; set; }
        public string PolicyName { get; set; }
        public decimal PremiumAmount { get; set; }
        public string Status { get; set; }

    }
}
