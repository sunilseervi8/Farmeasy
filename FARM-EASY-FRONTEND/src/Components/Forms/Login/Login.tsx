import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // Correct import
import { loginUser, sendGoogleDataToBackend } from '../../../Service/AccountService.ts'; // Your login and Google data handling services
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/Slicer/AuthSlice';
import { AppDispatch, RootState } from '../../../Redux/Store';

interface DecodedToken {
  unique_name: string;
  role: string;
  nameid: string;
  email: string;
  given_name: string;
}

const Login = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 510);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const Navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 510);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to homepage if already authenticated
      // Navigate('/');
    }
  }, [isAuthenticated, Navigate]);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Google Login Authentication
  const handleSuccess = async (credentialResponse: any) => {
    if (credentialResponse?.credential) {
      try {
        const decodedUser = jwtDecode<any>(credentialResponse.credential);
        const { email, name, picture } = decodedUser;

        console.log("Google User Info:", { email, name, picture });

        const res = await sendGoogleDataToBackend({ email, name, profileUrl: picture });

        // Process the backend response
        const token = res;
        console.log("Received JWT token from backend:", res.token.toString());

        // Decode the JWT token to extract user details
        const userDetails: DecodedToken = jwtDecode<DecodedToken>(res.token.toString());
        const { unique_name, role, nameid, email: backendEmail, given_name } = userDetails;
            console.log("User details:", { unique_name, role, nameid, email: backendEmail, given_name });
        dispatch(login({
          username: unique_name,
          role: role,
          email: backendEmail,
          token: token,
          profileUrl: given_name ,  
        }));

        // Notify the user of successful login and navigate to the homepage
        toast.success("Login successful!");
        Navigate('/'); // Redirect after successful login

      } catch (error) {
        console.error("Error during Google login or backend verification:", error);
        toast.error("Google login failed. Please try again.");
      }
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
    toast.error('Google Login Failed. Please try again.');
  };

  // Form Submit Login
  const handleLoginSubmit = async (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const res: any = await loginUser(values); // Call login service

      if (res && res.message) {
        const token = res.message.toString(); // Ensure token exists
        console.log("Login token:", token);

        // Decode the token to get user details
        const userDetails: DecodedToken = jwtDecode<DecodedToken>(token);
        const { unique_name, role, nameid, email, given_name } = userDetails;

        // Dispatch login action with extracted user details
        dispatch(login({
          username: unique_name,
          role: role,
          email: email,
          token: token,
          profileUrl: given_name,
        }));

        toast.success("Login successful!");
        Navigate('/'); // Redirect after successful login
      } else {
        throw new Error("Token missing from response");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0F2FE]">
  <div className={`flex bg-white shadow-lg rounded-lg max-w-4xl w-full ${isSmallScreen ? "flex-col" : ""}`}>
    
    {/* Left side - Graphic Section */}
    <div className="w-full lg:w-1/2 relative flex justify-center items-center">
      <img
        src="https://i.pinimg.com/474x/cb/b4/99/cbb49908261f229f1ed628354f4c44fb.jpg"
        alt="Farm Illustration"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center p-8 bg-black bg-opacity-50 rounded-lg">
        <h4 className="text-2xl font-semibold mb-4 text-white">Welcome To Farm-Easy</h4>
        <p className="text-gray-300">Unlock opportunities and simplify your farming journey.</p>
      </div>
    </div>

    {/* Right side - Login Form */}
    <div className="w-full lg:w-1/2 p-12">
      <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#000d6b' }}>Login to your Account</h2>
      <p className="text-gray-500 mb-6 text-center">Enter your details below</p>

      {/* Google Login Button */}
      <div className="flex justify-center mb-8">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>

      {/* Formik form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Username or email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            {/* Forgot Password Link */}
            <div className="mb-6 text-right">
              <Link to="/forgotpassword" className="text-[#000d6b] hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#000d6b] text-white font-semibold hover:bg-[#000a56] transition duration-300"
              disabled={isSubmitting}
            >
              Login
            </button>

            {/* Sign Up Button */}
            <div className="text-center mt-4">
              <span className="text-gray-500">Don't have an account? </span>
              <Link to="/register" className="text-[#000d6b] hover:underline font-semibold">
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
</div>



  );
};

export default Login;
