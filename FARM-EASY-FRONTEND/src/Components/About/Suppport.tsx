import React from 'react';
import vector11 from '../../../public/Images/vector11.svg';
import vector22 from '../../../public/Images/vector22.svg';
import vector33 from '../../../public/Images/vector33.svg';
import vector44 from '../../../public/Images/vector11.svg'; // Assuming you have a 4th image
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const OfferSection: React.FC = () => {

  //
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Set the animation duration to 1000ms (1s)
  }, []);

  return (
    <div className="h-auto p-12 mt-24 mb-24">
    <h1 className="text-2xl font-semibold uppercase text-center" data-aos="fade-up">
      What we offer
    </h1>
    <p className="text-lg text-center mb-12 mt-3 opacity-90" data-aos="fade-up" data-aos-delay="200">
      Being a part of Krishi Sadhan, this is what you get from us:
    </p>
  
    {/* Responsive grid for 4 items */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
      {/* First support item */}
      <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-right">
        <img className="supportImg mx-auto" src={vector11} alt="Customer Support" />
        <h3 className="text-xl mb-1 text-center font-semibold mt-5">
          24*7 customer support
        </h3>
        <p className="text-md text-center font-normal">
          We’re just one call away.
        </p>
      </div>
  
      {/* Second support item */}
      <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-left" data-aos-delay="100">
        <img className="supportImg mx-auto" src={vector22} alt="Trusted Sellers/Buyers" />
        <h3 className="text-xl mb-1 text-center font-semibold mt-5">
          Trusted Sellers/Buyers
        </h3>
        <p className="text-md text-center font-normal">
          Ensured safety of your experience.
        </p>
      </div>
  
      {/* Third support item */}
      <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-right" data-aos-delay="200">
        <img className="supportImg mx-auto" src={vector33} alt="One-click Booking" />
        <h3 className="text-xl mb-1 text-center font-semibold mt-5">
          One-click Booking
        </h3>
        <p className="text-md text-center font-normal">
          Time-saving bookings.
        </p>
      </div>
  
      {/* Fourth support item */}
      <div className="supportItem bg-white shadow-lg p-9 rounded-2xl" data-aos="fade-left" data-aos-delay="300">
        <img className="supportImg mx-auto" src={vector44} alt="Wide Network" />
        <h3 className="text-xl mb-1 text-center font-semibold mt-5">
         Easy Rental
        </h3>
        <p className="text-md text-center font-normal">
        Rent high-quality agricultural machinery.
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default OfferSection;
