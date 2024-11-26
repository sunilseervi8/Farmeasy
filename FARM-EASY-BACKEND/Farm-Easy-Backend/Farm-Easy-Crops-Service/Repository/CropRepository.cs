using LMS_User_Service.Data;
using LMS_User_Service.IRepository;
using LMS_User_Service.Model;

namespace LMS_User_Service.Repository
{
    public class CropRepository: CropIRepository
    {
        private readonly CropDBContext _context;

        public CropRepository(CropDBContext context)
        {
            _context = context;
        }

        public IEnumerable<Crop> GetAllCrops()
        {
            return _context.Crops.ToList();
        }

        public Crop GetCropById(int id)
        {
            return _context.Crops.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Crop> GetCropsByCategory(string category)
        {
            return _context.Crops.Where(c => c.Category == category).ToList();
        }

        public Crop AddCrop(Crop crop)
        {
            _context.Crops.Add(crop);
            _context.SaveChanges();
            return crop;
        }

        public Crop UpdateCrop(int id, Crop updatedCrop)
        {
            var crop = _context.Crops.FirstOrDefault(c => c.Id == id);
            if (crop == null) return null;

            crop.Name = updatedCrop.Name;
            crop.Category = updatedCrop.Category;
            crop.Quantity = updatedCrop.Quantity;
            crop.Unit = updatedCrop.Unit;
            crop.Price = updatedCrop.Price;
            crop.ImageUrl = updatedCrop.ImageUrl;

            _context.SaveChanges();
            return crop;
        }

        public bool DeleteCrop(int id)
        {
            var crop = _context.Crops.FirstOrDefault(c => c.Id == id);
            if (crop == null) return false;

            _context.Crops.Remove(crop);
            _context.SaveChanges();
            return true;
        }
    }
}
 