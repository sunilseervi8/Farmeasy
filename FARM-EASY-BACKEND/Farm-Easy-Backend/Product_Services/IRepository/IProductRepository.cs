using Product_Services.Model;

namespace Product_Services.IRepository
{
    public interface IProductRepository
    {
        Task<Product> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(string id, Product product);
        Task<bool> DeleteProductAsync(string id);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string id);


        // Review-related operations
        Task<bool> AddReviewAsync(string productId, Reviews review);
        Task<IEnumerable<Reviews>> GetProductReviewsAsync(string productId);

    }
}
