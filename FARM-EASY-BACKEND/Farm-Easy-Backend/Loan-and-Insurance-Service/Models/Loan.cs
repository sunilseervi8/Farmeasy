using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Loan_and_Insurance_Service.Models
{
    public class Loan
    {
        [Key]
        public int LoanId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [Column(TypeName = "float")]
        public float InterestRate { get; set; }

        [Required]
        public int TermInYears { get; set; }

        [Required]
        public bool IsApproved { get; set; }

        [Required]
        [StringLength(100)]
        public string ProviderName { get; set; }
    }
}
