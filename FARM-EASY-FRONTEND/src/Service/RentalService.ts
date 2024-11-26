import axios from "axios";
import { generateImageUrl } from "./ImageUrlService";

const _url = import.meta.env.VITE_API_URL_Rentals;

class RentalServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RentalServiceError";
  }
}

export const addRental = async (rental: any) => {
  try {
    const imageUrlFromCloud = await generateImageUrl(rental.rentalImage);
    const response = await axios.post(_url, {
      UserId: rental.userId,
      RentalTitle: rental.rentalTitle,
      RentalDescription: rental.rentalDescription,
      RentalPrice: rental.rentalPrice,
      RentalLocation: rental.rentalLocation,
      RentalNumberPlate: rental.rentalNumberPlate,
      RentalImage: imageUrlFromCloud,
    });

  
      console.log('rental data posted:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('Error adding crop:', error);
      throw new RentalServiceError('Failed to add rental.');
    } 
};

export const GetRentalById = async (rentalId: string) => {
  try {
    const response = await axios.get(`${_url}/${rentalId}`);
    console.log('Fetched rental by ID:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching rental by ID:', error);
    throw new RentalServiceError('Rental not found.');
  }
};

export const GetRentalsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${_url}/user/${userId}`);
    console.log('Fetched rentals by user ID:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching rentals by user ID:', error);
    throw new RentalServiceError('Failed to fetch rentals for the user.');
  }
};

export const GetRentalsBySellerId = async (sellerId: string) => {
  try {
    const response = await axios.get(`${_url}/seller/${sellerId}`);
    console.log('Fetched rentals by seller ID:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching rentals by seller ID:', error);
    throw new RentalServiceError('Failed to fetch rentals for the seller.');
  }
};


export const GetAllRentals=async ()=>{
  try {
    const response = await axios.get(_url); 
    console.log("Fetched all Rentals:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all Rentals:", error);
    new RentalServiceError('Failed to fetch all rentals.');
  }
};
