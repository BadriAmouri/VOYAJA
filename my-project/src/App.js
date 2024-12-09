import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./Components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./Components/common/Navbar";
import {
  AddProduct,
  Customers,
  Inbox,
  Orders,
  Products,
  Settings,
  SingleCustomer,
  SingleOrder,
  SingleProduct,
  
  
} from "./pages";

const sideBarWidth = 250;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        sideBarWidth={sideBarWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        sideBarWidth={sideBarWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 2 },
          width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
        }}
      >
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<SingleCustomer />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/orders/:id" element={<SingleOrder />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
        
      </Box>
    </Box>
  );
}

export default App;
