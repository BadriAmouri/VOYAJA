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
    url: "/Dashboard",
  },
  {
    name: "Offers",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "All Offers",
        url: "/Dashboard/products",
      },
      {
        name: "Add Offer",
        url: "/Dashboard/products/add",
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
    url: "/Dashboard/settings",
  },
  {
    name: "Inbox",
    icon: <FiMail />,
    url: "/Dashboard/inbox",
  },
];
