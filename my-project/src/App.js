import * as React from "react";
import Dashboard_Agency from "./Page/Dashboard_Agency";
import Home from "./Page/Home";
import AgencyProfile from "./Page/AgencyProfile";
import OfferDetails from "./Page/OfferDetailsPage";
import OfferDetailsPage from "./Page/OfferDetailsPage";
import Header from "./Components/NavBar";
function App() {
  return (
    <div className="App">
      <Header />
      <OfferDetailsPage />
    </div>
  );
}

export default App;
