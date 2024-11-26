import VideoBanner from '../Components/About/VideoBanner';
import Support from '../Components/About/Suppport';
import MachineryRentalSection from '../Components/About/Rentals';
import Equipments from '../Components/About/Seller';
export default function about() {
  return (
    <div>
      {/* Video Section */}
      <VideoBanner />
      {/* support Section */}
      <Support/>
      {/* Section for the rentals */}
      <MachineryRentalSection />
      {/*trust section*/}
      {/* selling */}
      <Equipments />

    </div>
  );
}
