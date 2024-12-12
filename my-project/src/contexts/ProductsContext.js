// context/ProductsContext.js
import { createContext, useContext, useState } from "react";

// Create a Context
const ProductsContext = createContext();

// Create a provider component
export const ProductsProvider = ({ children }) => {
  const [updatedProducts, setUpdatedProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{ updatedProducts, setUpdatedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useProducts = () => useContext(ProductsContext);

