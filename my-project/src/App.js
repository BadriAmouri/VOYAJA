import * as React from "react";
import Dashboard_Agency from "./Page/Dashboard_Agency";
import Home from "./Page/Home";
import AgencyProfile from "./Page/AgencyProfile";
import "./App.css";
import Destination from "./Components/Destinations/Destinations.jsx";
import BookingPage from "./Components/Booking/BookingPage.jsx";

import ConfirmationPage from "./Components/Confirmation/confirmationPage.jsx";
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
import Notifications from "./Components/Notifications.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./contexts/ProductsContext";
import { AppProvider } from "./contexts/AppContext";

import LoginFormAgency from "./Components/Login/LoginFormAgency";

import Admin from "./Page/Admin.jsx";
import OffersTable from "./Components/Admin/offersTable.jsx";
import OffersDetailsAdmin from "./Components/Admin/offerDetailsAdmin.jsx";
import UsersTable from "./Components/Admin/usersTable.jsx";
import BookingTable from "./Components/Admin/bookingsTable.jsx";
import AdminReviewsPage from "./Components/Admin/siteReviews.jsx";

function App() {
  return (
    <ProductsProvider>
      <AppProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<ImageUploader />} /> */}
            <Route path="/Dashboard/*" element={<Dashboard_Agency />} />
            <Route path="/offerDetails/:id" element={<OfferDetailsPage />} />
            <Route path="/Confirmation" element={<ConfirmationPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking/:offerid" element={<BookingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/destinations" element={<Destination />} /> */
            <Route path="/SignUp" element={<SignUp />} /> */
            <Route path="/Login2" element={<Login2 />} /> */
            <Route path="/Login_Agency" element={<Login2 />} /> */
            <Route path="/Login" element={<Login />} /> */
            <Route path="/SetPassword" element={<SetPassword />} /> */
            <Route path="/ForgotPassword" element={<ForgotPassword />} /> */
            <Route path="/SignUp_Agency" element={<SignUp_Agence />} /> */
            <Route path="/SignUp_Agence" element={<SignUp_Agence />} /> */
            <Route path="/SignUp_Agence2" element={<SignUp_Agence2 />} /> */
            <Route path="/SignUp_Agence2" element={<SignUp_Agence2 />} />
            <Route path="/Login_Agency" element={<Login2 />} />
            <Route
              path="/VerifyPasswordCode"
              element={<VerifyPasswordCode />}
            />{" "}
            */
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/agencyprofile/:agencyId"
              element={<AgencyProfile />}
            />
          </Routes>
        </div>
      </AppProvider>
    </ProductsProvider>
  );
}

export default App;
