import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare } from "react-icons/fa";
import {
  FiHome,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/",
  },
  {
    name: "Offers",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "All Offers",
        url: "/products",
      },
      {
        name: "Add Offer",
        url: "/products/add",
      },
      
    ],
  },
  /* for the moment 
  {
    name: "Customers",
    icon: <FiUsers />,
    url: "/customers",
  },
*/
/*
  {
    name: "Orders",
    icon: <FiShoppingCart />,
    subLinks: [
      {
        name: "All Orders",
        url: "/orders",
      },
   
    ],
  },
   */
  
  
  {
    name: "Settings",
    icon: <FiSettings />,
    url: "/settings",
  },
  {
    name: "Inbox",
    icon: <FiMail />,
    url: "/inbox",
  },
];
