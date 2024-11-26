import React, { useEffect, useState } from 'react';
import Search from '../Components/Home/Search';
import FunctionCard from '../Components/Home/FunctionalCard'; // Corrected typo in FunctionCard name
import VisionMision from '../Components/Home/VisionMision';
import { getAllProducts } from '../Service/Product';
import ProductCards from '../Products/ProductCards';
import { Navigate, useNavigate } from 'react-router';
import FloatingWhatsAppButton from '../Components/Home/FloatingWhatsAppButton';
import JingJing from '../Components/Home/JingJing'
import Corosel from '../Components/Crops/Carousel'
import { Link } from 'react-router-dom';
// Define the Product interface
interface Product {
  productName: string;
  productDescription: string;
  productPrice: string;
  sellerId: string;
  productDatePosted: string;
  productImageUrl: string;
  productCategory: string;
  ProductStock: number;
}

const Home = () => {
  const [productData, setProductData] = useState<Product[]>([]); 

  const Navigate =useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getAllProducts();
        setProductData(data);   
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();  
  }, []);    
  const handleProdcut=()=>{
     Navigate('/productHome')
  }

  return (
    <>
      {/* Search Section */}
      <JingJing/>
      {/* Functional Card Section */}
      <FunctionCard />
      <FloatingWhatsAppButton/>
      
      {/* Vision and Mission Section */}
      <VisionMision />
      <Corosel productData={productData}/>
      

    </>
  );
};

export default Home;
