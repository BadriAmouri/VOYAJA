import * as React from "react";
import Dashboard_Agency from "./Page/Dashboard_Agency"
import Home from "./Page/Home"
import   AgencyProfile  from "./Page/AgencyProfile"



import Header from "./Components/Home_Nav_Bar.jsx";
import Footer from "./Components/Footer.jsx";
import './App.css';
import Destination from "./Components/Destinations/Destinations.jsx";
import BookingPage from "./Components/Booking/BookingPage.jsx";
import Profile from "./Page/Profile.jsx";
import ProfilePage from "./Components/Profile/profilePage.jsx";
import SearchBar from "./Components/SearchBarHome.jsx";
import SearchPage from "./Page/SearchPage.jsx";
import Login from "./Page/Login_user.jsx";
import Login2 from "./Page/Login_agency.jsx";
import SignUp from "./Page/SignUpUser.jsx";
import SignUp_Agence from "./Page/SignUpAgency1.jsx";
import SignUp_Agence2 from "./Page/SignUpAgency2.jsx";
import SetPassword from "./Page/SetPassword.jsx";
import ForgotPassword from "./Page/ForgotPassword.jsx";
import VerifyPasswordCode from "./Page/VerifyPasswordCode.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  

  return (
    <div className="App">
 <Routes>
          <Route path="/" element={<Login/>} />
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
          
          //Add more routes as needed
        </Routes>
            </div>
  );
}

export default App;
