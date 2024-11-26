import { useState } from "react";
import {forgotPassword} from '../../../Service/AccountService'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log(email)
        // Send password reset email
        forgotPassword(email);
        setMessage('Password reset email sent! Check your inbox.');
        setError('');
      } catch (err) {
        console.error(err);
        setMessage('');
        setError('Failed to send password reset email. Please check your email address.');
      }
    };
    
    return (
        <div className="container min-h-screen ">
          <div className="items-center max-w-lg  bg-gray-100">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4">Forgot Password</h2>
            {message && <p className="text-txt-blue">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="bg-custom-blue hover:bg-hover-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Reset Email
              </button>
            </form>
            <div className="mt-4">
              <a href="/login" className="text-txt-blue">Back to Login</a>
            </div>
          </div>
        </div>
        </div>
      );
};

export default ForgotPassword;