import axios from "axios";
const _url=import.meta.env.VITE_API_URL_IMAGE_URL
console.log(_url)

     export const generateImageUrl = async (imageFile: File): Promise<string> => {
        // const formData = new FormData();
        // await formData.append('file', imageFile); 
        try {
          const response = await axios.post(_url,{ 'file':imageFile}, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          return response.data.url; 
      console.log('file',response.data.url)

        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
     }
    };
