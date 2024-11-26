import { useEffect, useState } from "react";
import { GetAllRentals } from "../Service/RentalService";
import { Grid, Grid2 } from "@mui/material";
import AddRentalsModel from '../Components/Rentals/AddRentalsModel'
import RentalsCard from '../Components/Rentals/RentalsCard'

interface Rent {
  rentalTitle: string;
  rentalDescription: string;
  rentalPrice: number;
  rentalImage: string;
}

const RentGrid: React.FC = () => {
  // Initial local rental data
  const localrental: Rent[] = [
    { rentalTitle: "TRACTOR", rentalPrice: 1378.25, rentalDescription: 'Lakh Tonnes', rentalImage: 'https://media.sandhills.com/img.axd?id=9023942478&wid=4326205933&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=BOcUTWCqhTe8dVisLSVczN5egE%2f59oIGDKorisdSWTc%3d' },
    { rentalTitle: "HARVESTOR", rentalPrice: 1132.92, rentalDescription: 'Lakh Tonnes', rentalImage: 'https://media.sandhills.com/img.axd?id=8033641136&wid=3005291595&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=sEouSUCx4WhqiAtQezyf6zilwdLc9n8XoqLK%2b1ngeWg%3d' },
    { rentalTitle: 'TILLAGE', rentalPrice: 376.6, rentalDescription: 'Lakh Tonnes', rentalImage: 'https://media.sandhills.com/img.axd?id=9026193636&wid=4326205933&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=Qv%2fmm0XD4QWlRhoVLwGFenQAIqf40PyoMAAdvpZU9FE%3d' },
    { rentalTitle: 'HEADERS', rentalPrice: 110.39, rentalDescription: 'Lakh Tonnes', rentalImage: 'https://media.sandhills.com/img.axd?id=8042556139&wid=4326205933&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=z96W%2fHEgb7nipZbPaTqYXQqjinverfUwPNCtJK6qovE%3d' },
    { rentalTitle: 'PLANTING', rentalPrice: 107.16, rentalDescription: 'Lakh Tonnes', rentalImage: 'https://media.sandhills.com/img.axd?id=8042146113&wid=4326205933&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=h%2feMzCGVZNpsnb9xrbTyYqDtts51EMSI%2b9vIrd%2bkcUg%3d' },
    { rentalTitle: 'MOWER', rentalPrice: 50.34, rentalDescription: 'Lakh Tonnes', rentalImage: 'https://media.sandhills.com/img.axd?id=9022193953&wid=4326205933&rwl=False&p=&ext=&w=350&h=220&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum=3KHh8%2f4mYPeFtFyXpZ2cvnr2%2ftJxM9jBp4bHSk1cDsk%3d' }
  ];

  const [rental, setRental] = useState<Rent[]>(localrental);

  // Fetch data from server and combine it with local data
  useEffect(() => {
    GetAllRentals().then((serverRentals: Rent[]) => {
      // Combine server crops with local crops
      setRental([...localrental, ...serverRentals]);
    });
  }, []);
  return (
    <div className="mb-10">
      <AddRentalsModel />
      <div className="relative h-[60vh]" style={{backgroundRepeat:'no-repeat', backgroundSize:'cover', 
        background: 'linear-gradient(rgb(0, 13, 107, 0.6), rgb(0, 13, 107, 0.6))', backgroundImage:"url('Images/Subheader1.webp')"}}>
          {/* Overlay to darken the image */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

{/* Content centered over the background image */}
<div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">

          {/* Content centered over the background image */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl font-bold mt-[-50px]">Rentals</h1>
          </div>
          </div>
        </div>
      {/* Pass the combined crops data to the CropsCard component */}
      <div className="mt-[60px]">
      <RentalsCard rentalsData={rental} />

        </div>
    </div>
  );
}
export default RentGrid;
