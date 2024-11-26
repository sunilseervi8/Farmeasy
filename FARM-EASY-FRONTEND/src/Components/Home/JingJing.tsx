import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import AOS from 'aos';


export default function JingJing() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);
  return (
    <div>
    {/* Video Section */}
    <div className="relative w-full h-[80vh] bg-black" data-aos="fade-in">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="Images/Home1.jfif"
      />
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
          Let’s change the way of farming together
        </h1>
        <button
          className="mt-4 px-8 py-3 text-lg bg-green-600 rounded-lg hover:bg-green-700 transition"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          Start now
        </button>
      </div>
    </div>
  </div>
  
    );
  }
  