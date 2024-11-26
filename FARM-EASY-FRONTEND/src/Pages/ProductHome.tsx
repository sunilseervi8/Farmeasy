import ProductCards from "../Products/ProductCards";
// import Sidebar from "../Products/Sidebar";
import SubHeaderProduct from "../Products/SubHeaderProduct";
import  { useEffect, useState } from "react";
import {getAllProducts} from "../Service/Product"
import SliderCardProduct from '../Components/Home/SliderSection'
import ProductDes from "../Products/ProductDes";

const ProductPage = () => {
  

  const [productData, setProductData] = useState<Product[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  

  interface Product {
    productName: string;
    productDescription: string;
    productPrice: string;
    sellerId: string;
    datePosted: string;
    productImageUrl: string;
    productCategory: string;
    ProductStock: number;
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getAllProducts();
        setProductData(data);  
        setLoading(false);
      } catch (error) {
        setLoading(false);  
      }
    }
    fetchProducts();
  }, []);

 
  
  return (
    <div className="flex flex-col gap-5">
      <div>
        <SubHeaderProduct />
      </div>

      {/* Main content - Product listings */}
      <div className=" flex flex-row  p-2">
        <div className="">
          {/* <Sidebar/> */}
        </div>
        <div>
          <ProductCards productData={productData} />
        </div>
      </div>
      <div>
      </div>
     
      <SliderCardProduct />
    </div>
  );
};

export default ProductPage;
