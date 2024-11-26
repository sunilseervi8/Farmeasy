namespace RentService.Model.DTO
{
    public class RentalDTO
    {
        
        public string RentalName { get; set; }
        public string RentalDescription { get; set; }
        public decimal RentalPrice { get; set; }
        public string RentalLocation { get; set; }
        public string RentalNumberPlate { get; set; }
        public string RentalImage { get; set; }
        public bool RentalIsApproved { get; set; } = false;
    }
}
