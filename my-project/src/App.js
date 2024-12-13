import * as React from "react";
import Dashboard_Agency from "./Page/Dashboard_Agency"
import Home from "./Page/Home"
import   AgencyProfile  from "./Page/AgencyProfile"
import Header from "./Components/Home_Nav_Bar.jsx";
import Footer from "./Components/Footer.jsx";
import './App.css';
import Destination from "./Components/Destinations/Destinations.jsx";
import BookingPage from "./Components/Booking/BookingPage.jsx";

import ConfirmationPage from "./Components/Confirmation/confirmationPage.jsx"

import Profile from "./Page/Profile.jsx";
import SearchBar from "./Components/SearchBarHome.jsx";
import SearchPage from "./Page/SearchPage.jsx";
import Login from "./Page/Login_user.jsx";
import Login2 from "./Page/Login_agency.jsx";
import SignUp from "./Page/SignUpUser.jsx";
import SignUp_Agence from "./Page/SignUpAgency1.jsx";
import SignUp_Agence2 from "./Page/SignUpAgency2.jsx";
import OfferDetailsPage from "./Page/OfferDetailsPage";
import SetPassword from "./Page/SetPassword.jsx";
import ForgotPassword from "./Page/ForgotPassword.jsx";
import VerifyPasswordCode from "./Page/VerifyPasswordCode.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./contexts/ProductsContext";

function App() {
  


   return (
// <<<<<<< Booking_confirmation
//   <div className="App">
//     <BookingPage/>
//     {/* <Profile/> */}
//   </div>
//   )
// }
//
    <ProductsProvider>
    <div className="App">
 <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Dashboard/*" element={<Dashboard_Agency/>} />
          <Route path="/offerDetails" element={<OfferDetailsPage/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/destinations" element={<Destination />} /> */
          <Route path="/SignUp" element={<SignUp />} /> */
          <Route path="/Login2" element={<Login2 />} /> */
          <Route path="/Login" element={<Login />} /> */
          <Route path="/SetPassword" element={<SetPassword />} /> */
          <Route path="/ForgotPassword" element={<ForgotPassword />} /> */
          <Route path="/VerifyPasswordCode" element={<VerifyPasswordCode />} /> */
          
         
        </Routes>
            </div>
            </ProductsProvider>
  );
}

export default App;

