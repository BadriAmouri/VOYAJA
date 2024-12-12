import Header from "./Components/Home_Nav_Bar";
import Footer from "./Components/Footer.jsx";
import './App.css';
import Destination from "./Components/Destinations/Destinations.jsx";
import Home from "./Components/Home/Home.jsx";
import BookingPage from "./Components/Booking/BookingPage.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import ConfirmationPage from "./Components/Confirmation/confirmationPage.jsx"

export default function App() {
  return (
  <div className="App">
    <BookingPage/>
    {/* <Profile/> */}
  </div>
  )
}