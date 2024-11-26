import './App.css'
import Header from './Components/Navigation/Header'
import About from './Pages/About'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Forms/Login/Login'
import Register from './Components/Forms/Register/Register'
import ContactForm from './Pages/Contact'
import SellerProduct from './Components/Dashboard/DBProductcard'
import SellerOverview from './Components/Dashboard/Overview'
import SellerDashboard from './Pages/SellerDashboard'
import Footer from './Components/Navigation/Footer'
import AddProductForm from './Products/AddProduct'
import Home from './Pages/Home'
import CropsHome from './Pages/CropsHome'
import ForgotPassword from './Components/Forms/Login/ForgotPassword'
import ProductHome from './Pages/ProductHome';
import ResetPasswordValidator from './Components/Forms/Login/ResetPasswordValidator'
import FarmingCourses from './Components/Awarness/FarmingCourses'
import Rentals from './Pages/Rentals';
import { CustomThemeProvider } from './GlobalData/GlobalData'
import Insurance from './Components/LoanInsurance/Loan'
import SellerCard from './Components/Dashboard/Seller'
import RentalList from './Components/Dashboard/Rental'
import CropsListing from './Components/Dashboard/CropsListing'
import Overview from './Components/Dashboard/Overview'
function App() {

  return (
    <>
      <CustomThemeProvider>

        <div className='mb-64px '>
          <Header />
        </div>
        {/* <DynamicBreadcrumbs /> */}

        {/* <Dashboard /> */}
        <Routes >
          <Route path="/about" element={<About />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/contact" element={<ContactForm />}></Route>
          <Route path="/AddProductForm" element={<AddProductForm />}></Route>
          <Route path="/productHome" element={<ProductHome />}></Route>
          <Route path="/Awarenessvideos" element={<FarmingCourses />}></Route>
          <Route path="resetpassword" element={<ResetPasswordValidator />}>ResetPasswordForm</Route>
          <Route path="/farmingCourses" element={<FarmingCourses />}></Route>
          <Route path='/insurance' element={<Insurance />}></Route>
          <Route path="/crops" element={<CropsHome />}></Route>
          <Route path="/rentals" element={<Rentals />}></Route>
          <Route path="/sellerDashboard" element={<SellerDashboard />}>
            <Route path="/sellerDashboard/sellerProduct" element={<SellerProduct />} />
            <Route path="/sellerDashboard/sidebarDashboard" element={<SellerOverview />} />
            <Route path="/sellerDashboard/sellerCard" element={<SellerCard />} />
            <Route path="/sellerDashboard/rentals" element={<RentalList />} />
            <Route path="/sellerDashboard/crops" element={<CropsListing />} />
            <Route path="/sellerDashboard/overview" element={<Overview />} />
          </Route>
        </Routes>

        <Footer />
      </CustomThemeProvider>

    </>

  )
}

export default App
