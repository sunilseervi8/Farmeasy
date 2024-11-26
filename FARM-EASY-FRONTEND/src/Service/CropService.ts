import axios from 'axios'
import { generateImageUrl } from './ImageUrlService';

const _url=import.meta.env.VITE_API_URL_crop;
console.log(_url)
export const addCrop = async (crops: any) => {
    try {
      const imageUrlFromCloud = await generateImageUrl(crops.image);
     console.log("responsre njdchfj",imageUrlFromCloud)
      const response = await axios.post(_url, {
        Name: crops.cropName,
        Category: crops.category,
        Quantity: crops.quantity,
        Unit: crops.unit,
        Price: crops.price,
        ImageUrl: imageUrlFromCloud, 
      });
  
      console.log('Crop data posted:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('Error adding crop:', error);
      throw error;
    }
   
}
export const GetAllCrops=async ()=>{
  try {
    const response = await axios.get(_url); 
    console.log("Fetched all Crops:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all Crops:", error);
    throw error;
  }
}
 