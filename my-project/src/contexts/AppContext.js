// context/AppContext.js
import { createContext, useContext, useState } from "react";

// Create a Context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Global state
  const [clientID, setClientID] = useState(0);
  const [agencyID, setAgencyID] = useState(0);
  const [offerID, setOfferID] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <AppContext.Provider
      value={{ clientID, setClientID, agencyID, setAgencyID, offerID, setOfferID , isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);