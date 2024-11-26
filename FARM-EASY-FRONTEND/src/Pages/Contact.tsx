import { GiWorld } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone, BsArrowRight } from "react-icons/bs";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex h-[42vh] bg-cover bg-no-repeat mb-10 bg-[url('/Images/contact-bg.jpg')]">
        <h1 className="w-full sm:w-[60%] md:w-[50%] lg:w-[30%] p-6 bg-white rounded-t-lg  m-auto text-center text-gray-800 font-serif">
          Contact Us
        </h1>
      </div>

      {/* Content Section */}
      <div className="w-4/5 mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-10">We love meeting new people and helping them.</h2>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          
          {/* Contact Info Section */}
          <div className="bg-gray-100 p-8 rounded-lg w-full lg:w-1/3 mb-8 mr-10 lg:mb-0">
            <div className="space-y-6 text-left">
              <p className="flex items-center">
                <span className="p-3 rounded-full bg-white shadow-md mr-4">
                  <HiOutlineMail className="text-teal-500" />
                </span>
                <a href="mailto:helpdesk@farmeasy.com">helpdesk@farmeasy.com</a>
              </p>
              <p className="flex items-center">
                <span className="p-3 rounded-full bg-white shadow-md mr-4">
                  <BsTelephone className="text-teal-500" />
                </span>
                +91 8660771074
              </p>
              <p className="flex items-center">
                <span className="p-3 rounded-full bg-white shadow-md mr-4">
                  <GiWorld className="text-teal-500" />
                </span>
                <a href="www.yourdomain.com">www.yourdomain.com</a>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-10">
              <ul className="flex justify-center space-x-6">
                <li><a href="https://www.facebook.com/"><FaFacebookF className="text-gray-600 hover:text-blue-900" /></a></li>
                <li><a href="https://www.instagram.com/"><FaInstagram className="text-gray-600 hover:text-blue-900" /></a></li>
                <li><a href="https://www.twitter.com/"><FaTwitter className="text-gray-600 hover:text-blue-900" /></a></li>
                <li><a href="https://www.linkedin.com/"><FaLinkedin className="text-gray-600 hover:text-blue-900" /></a></li>
              </ul>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full lg:w-2/3">
            <form className="space-y-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Name"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-950 p-2"
                />
                <input
                  type="email"
                  name="mail"
                  placeholder="Email"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-950 p-2"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-950 p-2"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-950 p-2"
                />
              </div>
              <textarea
                name="interested"
                placeholder="Hello, I am interested in..."
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-950 p-2 resize-none h-32"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-hover-blue focus:outline-none"
                >
                  Send Now
                  <BsArrowRight className="inline ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex justify-center my-16 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2312.9432895919927!2d77.65452015073697!3d12.850287599391182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c9c46f329eb%3A0x542348a38b44a4!2sHappiest%20Minds%20Technologies%20Limited!5e0!3m2!1sen!2sin!4v1729361250333!5m2!1sen!2sin"
          title="map"
          className="w-full h-80 md:w-[1000px] rounded-lg"
          allowFullScreen
          aria-hidden="false"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
