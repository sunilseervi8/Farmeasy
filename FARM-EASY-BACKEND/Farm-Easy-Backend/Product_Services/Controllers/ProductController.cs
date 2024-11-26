using Microsoft.AspNetCore.Mvc;
using Product_Services.IRepository;
using Product_Services.Model;

namespace Product_Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // POST: api/product
        [HttpPost]
        public async Task<IActionResult> AddProduct( Product product)
        {
            if (product == null)
            {
                return BadRequest(new { message = "Invalid product data" });
            }

            var addedProduct = await _productRepository.AddProductAsync(product);
            return Ok(new { message = "Product successfully added", product = addedProduct });
        }

        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }

        // GET: api/product/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new { message = "Invalid ID" });
            }

            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }
            return Ok(product);
        }

        // PUT: api/product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] Product updateProduct)
        {
            if (updateProduct == null)
            {
                return BadRequest(new { message = "Invalid product data" });
            }

            var updateResult = await _productRepository.UpdateProductAsync(id, updateProduct);

            if (!updateResult)
            {
                return NotFound(new { message = "Product not found or could not be updated" });
            }

            return Ok(new { message = "Product successfully updated" });
        }

        // DELETE: api/product/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new { message = "Invalid ID" });
            }

            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            var deleteResult = await _productRepository.DeleteProductAsync(id);
            if (!deleteResult)
            {
                return NotFound(new { message = "Product could not be deleted" });
            }

            return Ok(new { message = "Product successfully deleted" });
        }
    }
}
