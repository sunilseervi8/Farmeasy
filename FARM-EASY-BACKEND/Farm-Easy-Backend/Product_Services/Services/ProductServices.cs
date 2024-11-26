using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Product_Services.DataConfig;
using Product_Services.IRepository;
using Product_Services.Model;

namespace Product_Services.Services
{
    public class ProductServices : IProductRepository
    {
        private readonly IMongoCollection<Product> _product;

        public ProductServices(IOptions<Product_DBConfig> productConfig)
        {
            var mongoClient = new MongoClient(productConfig.Value.ServerURL);
            var mongoDB = mongoClient.GetDatabase(productConfig.Value.Database);
            _product = mongoDB.GetCollection<Product>(productConfig.Value.Collection);
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            product.ProductDatePosted = DateTime.UtcNow; // Set date when product is added
            product.IsProductVerified = false; // Default to not verified
            await _product.InsertOneAsync(product);
            return product;
        }

        //Review async method
        public async Task<bool> AddReviewAsync(string productId, Reviews review)
        {
            if (!ObjectId.TryParse(productId, out var objectId))
            {
                return false; // Handle invalid ID
            }

            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            var update = Builders<Product>.Update.Push(p => p.Reviews, review);

            var result = await _product.UpdateOneAsync(filter, update);

            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteProductAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return false; // Handle invalid ID
            }

            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            var result = await _product.DeleteOneAsync(filter);

            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _product.Find(_ => true).ToListAsync(); // Retrieves all products in the list
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null; // Handle invalid ID
            }

            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            return await _product.Find(filter).FirstOrDefaultAsync();
        }

        //Get Reviwes
        public async  Task<IEnumerable<Reviews>> GetProductReviewsAsync(string productId)
        {
            if (!ObjectId.TryParse(productId, out var objectId))
            {
                return null; // Handle invalid ID
            }

            var filter = Builders<Product>.Filter.Eq("_id", objectId);
            var product = await _product.Find(filter).FirstOrDefaultAsync();

            return product?.Reviews ?? new List<Reviews>();
        }

        public async Task<bool> UpdateProductAsync(string id, Product updateProduct)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return false; // Handle invalid ID
            }

            var filter = Builders<Product>.Filter.Eq("_id", objectId);

            // Dynamically updating only the provided fields
            var update = Builders<Product>.Update.Set(p => p.ProductDatePosted, DateTime.UtcNow); // Always update the date posted

            if (!string.IsNullOrEmpty(updateProduct.ProductName))
                update = update.Set(p => p.ProductName, updateProduct.ProductName);

            if (!string.IsNullOrEmpty(updateProduct.ProductDescription))
                update = update.Set(p => p.ProductDescription, updateProduct.ProductDescription);

            if (updateProduct.ProductPrice > 0)
                update = update.Set(p => p.ProductPrice, updateProduct.ProductPrice);

            if (!string.IsNullOrEmpty(updateProduct.Productcategory))
                update = update.Set(p => p.Productcategory, updateProduct.Productcategory);

            if (updateProduct.ProductStock > 0) // Assuming Product_Stock is int now
                update = update.Set(p => p.ProductStock, updateProduct.ProductStock);

            if (!string.IsNullOrEmpty(updateProduct.ProductImageUrl))
                update = update.Set(p => p.ProductImageUrl, updateProduct.ProductImageUrl);

            update = update.Set(p => p.IsProductVerified, updateProduct.IsProductVerified);

            var result = await _product.UpdateOneAsync(filter, update);

            return result.IsAcknowledged && result.ModifiedCount > 0;
        }
    }
}
