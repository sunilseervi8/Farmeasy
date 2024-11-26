
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Product_Services.Model
{
    public class Product
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ProductId { get; set; }
        [Required]
            public string? ProductName { get; set; }
            public string? ProductDescription { get; set; }
            public int? ProductPrice { get; set; } 
            public string ?SellerId { get; set; } // Foreign key to the Seller
            public DateTime ProductDatePosted { get; set; }
              
            public string ?ProductImageUrl { get; set; }
            public string? Productcategory { get; set; }
            public int ? ProductStock { get; set; }

           [BsonElement("Reviews")]
          public List<Reviews> Reviews { get; set; } = new List<Reviews>();

          public bool IsProductVerified { get; set; } = false; // For Admin Approval
        }

    }

