import axios from "axios";
import toast from "react-hot-toast"
const _url = import.meta.env.VITE_API_URL_Product;

//POST method for product

export const product = async (productdata: any) => {
  try {

    const response = await axios.post(_url, {
      productName: productdata.productName,
      productDescription: productdata.productDescription,
      productPrice: productdata.productPrice,
      sellerId: productdata.sellerId,
      productImageUrl:productdata.productImageUrl,
      productcategory: productdata.productCategory,
      productStock: productdata.productStock
      
    });
    console.log("response", response.data, "response", response);
    console.log(_url);
    toast.success("Added Successfully")

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};



// GET method for fetching all products
 export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${_url}`);
    console.log("Fetched all products:", response.data);
    toast.success("All products fetched successfully!");

    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    toast.error("Error fetching products");
    throw error;
  }
};

