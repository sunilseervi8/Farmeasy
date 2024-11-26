import { useEffect, useState } from "react";
import { useFormik } from "formik";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./register.css";
import { calculatePasswordStrength, getStrengthLabel, validationSchema } from '../../../Features/PasswordProgressAndValid.ts';
import { useNavigate } from "react-router";
import {registerUser} from "../../../Service/AccountService.ts"

const Register = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 510);
  const [passwordFocused, setPasswordFocused] = useState(false); 
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
  // useFormik hook
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "buyer", // Default role
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { fullName, email, password, phoneNumber, role } = values;
      await registerUser({ fullName, email, password, phoneNumber, role });

          console.log(values);
          setSubmitting(false);
 
    }
    
     });

  const passwordStrength = calculatePasswordStrength(formik.values.password);
  const strengthLabel = getStrengthLabel(passwordStrength);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0F2FE]">
  <div className={`flex bg-white shadow-lg rounded-lg max-w-4xl w-full ${isSmallScreen ? "flex-col" : ""}`}>
    
  {/* Left side - Image with Text Overlay */}
<div className="relative w-full lg:w-1/2 flex justify-center items-center">
  <img
    src="https://i.pinimg.com/474x/7d/93/3a/7d933ac3f168e7d1e07e28fbd874828b.jpg"
    alt="Farm Illustration"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="relative z-10 text-center p-8 bg-black bg-opacity-50 rounded-lg">
    <h4 className="text-2xl font-semibold mb-4 text-white">Welcome to the Farm Easy, a platform for Krishi Sadhan</h4>
    <p className="text-gray-300">Simplify your farming journey with Krishi Sadhan.</p>
  </div>
</div>


    {/* Right Side - Register Form */}
    <div className="right-section w-full lg:w-1/2 p-12">
      <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#000d6b' }}>Register here!</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <div className="input-group mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
          )}
        </div>

        {/* Email */}
        <div className="input-group mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        {/* Phone Number with Country Code */}
        <div className="input-group mb-4">
          <PhoneInput
            country={'in'}
            value={formik.values.phoneNumber}
            onChange={phone => formik.setFieldValue('phoneNumber', phone)}
            inputClass="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
            placeholder="Enter phone number"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
          )}
        </div>

        {/* Password */}
        <div className="input-group mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => setPasswordFocused(true)}
            onBlurCapture={() => setPasswordFocused(false)}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {/* Password Strength Bar */}
        {passwordFocused && (
          <>
            <div className="w-full bg-gray-200 h-2 rounded-lg mb-1">
              <div
                className={`${strengthLabel.color} h-2 rounded-lg`}
                style={{ width: strengthLabel.width }}
              ></div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {strengthLabel.text}
            </div>
          </>
        )}

        {/* Confirm Password */}
        <div className="input-group mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000d6b]"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 rounded-lg bg-[#000d6b] text-white font-semibold hover:bg-[#000a56] transition duration-300" disabled={formik.isSubmitting}>
          Register
        </button>
      </form>
    </div>
  </div>
</div>

  
  );
};

export default Register;
