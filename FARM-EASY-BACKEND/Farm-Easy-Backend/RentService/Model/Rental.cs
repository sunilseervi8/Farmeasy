using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentService.Model
{
    public class Rental
    {
        [Key]
        public string RentalId { get; set; }
        
        [Required]
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string RentalTitle { get; set; } 
        
        [Required]
        [StringLength(500)]
        public string RentalDescription { get; set; }
        
        [Required]
        [Range(0,double.MaxValue)]
        public decimal ReantalPrice { get; set; }
        
        [Required]
        [StringLength(100)]
        public string RentalLocation { get; set; }
       
        [Required]
        [StringLength(20)]
        public string RentalNumberPlate { get; set; }

        [Required]
        public string RentalImage { get; set; }
        public bool RentalIsApproved { get; set; } =  false;
    }
}
