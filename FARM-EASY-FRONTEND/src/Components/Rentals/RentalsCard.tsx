import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';
import BookingForm from '../../Pages/BookRental'

const RentalsCard = ({ rentalsData }: {
    rentalsData: {
        rentalTitle: string,
        rentalDescription: string,
        rentalPrice: number,
        rentalImage: string
    }[]
}) => {
    const [selectedRental, setSelectedRental] = useState<null | typeof rentalsData[0]>(null);

    const handleBookNow = (rental: typeof rentalsData[0]) => {
        setSelectedRental(rental);
    };

    const handleClose = () => {
        setSelectedRental(null);
    };
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {rentalsData.map((rent, index) => (
                    <div key={index} className=" shadow-lg rounded-lg overflow-hidden  bg-[#f8f8f8]  ">
                        {
                            // crop.image?(
                            <img src={rent.rentalImage} alt={rent.rentalTitle} className=" rounded-lg   h-45 mx-auto object-cover xl:w-60 lg:w-52 lg:h-36 mt-3" />
                        }
                        <div className="px-10 xl:p-4 mx-auto ">
                            <h3 className="text-lg font-bold text-txt-blue">{rent.rentalTitle}</h3>
                            <p className="text-xl font-semibold">{rent.rentalDescription}</p>
                            <p className="text-gray-600">{rent.rentalPrice}</p>
                            <button
                                onClick={() => handleBookNow(rent)}
                                className="py-2 px-2 my-2 bg-custom-blue text-white hover hover:px-2 hover:bg-[#000d4b] ">
                                <EventIcon sx={{ fontSize: 13, mr: 1 }} />
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRental && (
                <BookingForm rentalData={selectedRental} onClose={handleClose} />
            )}
        </>
    );
};
export default RentalsCard;