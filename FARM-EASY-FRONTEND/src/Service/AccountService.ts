import axios from "axios";

// Create a function to post the user data
const _url = import.meta.env.VITE_API_URL;
console.log(_url);
export const registerUser = (user: any): Promise<any> => {
  console.log("user acount", user);
  return axios
    .post(`https://localhost:8000/api/Account/register`, {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      role: user.role,
    })
    .then((response) => {
      return response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      throw error;
    });
};
//login
export const loginUser = async (user: any): Promise<any> => {
  console.log("Logging in user", user);
  return await axios
    .post(`https://localhost:8000/api/Account/login`, {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error;
    });
};

//forgot password
export const forgotPassword = async (email: any): Promise<any> => {
  console.log(email);
  return await axios
    .post(`https://localhost:8000/api/Account/forgot-password?email=${email}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error logging in:", error);
      throw error;
    });
};

//reset password

// Function to reset the password by sending a POST request
interface ResetPasswordDetails {
  email: string;
  token: string;
  newPassword: string;
}
export const resetPassword = async (data: any) => {
  console.log(data);

  try {
    const response = await axios.post(
      "https://localhost:8000/api/Account/reset-password",{
        email: data.email,
        Token: data.token.replace(/\s/g, '+'),
        newPassword: data.newPassword,
      } ); // Replace with your backend API URL
    // console.log(Token);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};



interface GoogleUserData {
  name:any;
  email: string;
  profileUrl: string;
  
}

 
export const sendGoogleDataToBackend = (googleUserData: GoogleUserData) => {
  console.log(googleUserData);
  
  return axios
    .post('https://localhost:8000/api/GoogleOuath/google-ouath', {
      fullName: googleUserData.name,
      email: googleUserData.email,
      ProfileImage: googleUserData.profileUrl,
      role: "buyer",  
    })
    .then((response) => {
      console.log(response.data);  
      return response.data; 
    })
    .catch((error) => {
      console.error('Error while sending Google data to backend:', error);
      return Promise.reject(error); // Return rejected promise to handle error
    });
};
