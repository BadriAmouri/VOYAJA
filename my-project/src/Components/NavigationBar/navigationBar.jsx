import React, { useState, useEffect } from "react";
import HomeLogo from "../../assets/Artboard 2@2x (1).png";
import OtherPagesLogo from "../../assets/Artboard 2@2x (2).png";
import { IoAirplane } from "react-icons/io5";
import { FaBell, FaHeart, FaBars } from "react-icons/fa";
import image2 from "../../assets/Profile/user.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";


const NavigationBar = ({isHome }) => {
  const [user, setUser] = useState(null); // To store user data
  const [profilePhoto, setProfilePhoto] = useState(image2); // Default profile image
  const [error, setError] = useState(null); // To handle errors
  const { clientID } = useAppContext(); // Assuming clientID comes from AppContext
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`/client/${clientID}`);
          if (!response.ok) {
            throw new Error("User not found or error occurred");
          }
          const data = await response.json();
          setUser(data.user); // Update state with user data
          console.log("The data is ", data); // Logs the fetched data
  
          // If the user has a profile image, update the profile photo state
          if (data.user.client_pic) {
            // Make sure to use the public URL from Supabase if available
            setProfilePhoto(data.user.client_pic);
          }
        } catch (error) {
          setError(error.message); // Set error if any
        }
      };
  
      fetchUserInfo();
    }, [clientID]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(null); // Manage pop-up modal visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Manage sidebar visibility
  const navigate = useNavigate();
   const {isLoggedIn, setIsLoggedIn} = useAppContext();
   const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavbarScrolled = isHome && isScrolled;

  const toggleModal = (modalType) => {
    setIsModalVisible(modalType);
  };

  const handleOptionClick = (option, type) => {
    console.log(`${type} - Selected option: ${option}`);
    setIsModalVisible(null); // Close the modal after selection

    // Handle the different routes for login or signup based on the `type`
    if (type === "login") {
      if (option === "Client") {
        navigate("/Login"); // Navigate to Login as Client
      } else if (option === "Agency") {
        navigate("/Login_Agency"); // Navigate to Login as Agency
      }
    } else if (type === "signup") {
      if (option === "Client") {
        navigate("/SignUp"); // Navigate to SignUp as Client
      } else if (option === "Agency") {
        navigate("/SignUp_Agency"); // Navigate to SignUp as Agency
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const isFavoritePage = location.pathname === '/Favorites';
  return (
    <div
      className={`fixed top-0 w-full flex items-center justify-between h-20 px-8 transition-all duration-300
      ${isNavbarScrolled || !isHome ? "bg-white shadow-md" : "bg-transparent"}`}
      style={{
        zIndex: 10000,
      }}
    >
      {/* leading */}
      <div className="flex items-center gap-2 text-lg font-bold">
        <IoAirplane
          className={`text-2xl ${
            isNavbarScrolled || !isHome ? "text-[#000000]" : "text-white"
          }`}
        />
        <span
          className={
            isNavbarScrolled || !isHome
              ? "text-[#000000]"
              : "text-white hidden lg:block"
          }
        >
          Find Offer
        </span>
      </div>
      {/* Logo */}
      
      <div className="block sm:h-10 w-20">
      <Link to ='/'>
        <img
          src={isNavbarScrolled || !isHome ? OtherPagesLogo : HomeLogo}
          alt="logo"
          className="h-4"
        />
        </Link>
      </div>
      
      {/* Hamburger Icon for small screens */}
      <div className="block md:hidden">
        <FaBars
          className="text-2xl text-white cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      {/* Desktop menu items */}
      <div
        className={`hidden md:flex items-center gap-4 ${
          isSidebarVisible ? "hidden" : ""
        }`}
      >
        {isLoggedIn ? (
          <>
           <Link to="/Favorites">
              <FaHeart
                className={`text-xl ${
                  isFavoritePage
                    ? "text-[#EF4217FF]" // Red if on Favorites page
                    : isNavbarScrolled || !isHome
                    ? "text-[#000000]"
                    : "text-white"
                } hover:text-[#EF4217FF] transition-colors duration-200`}
                style={{ marginRight: "20px" }}
              />
            </Link>
            <Link to="/notifications">
              <FaBell
                className={`text-xl ${
                  isNavbarScrolled || !isHome ? "text-[#000000]" : "text-white"
                } hover:text-[#4eb7ac] transition-colors duration-200`}
                style={{ marginRight: "20px" }}
              />
            </Link>
            <Link to="/profile">
              <img
                src={profilePhoto}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover cursor-pointer"
              />
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleModal("login")}
              className={`border-2 font-bold py-2 px-4 rounded transition-all duration-200
                ${
                  isNavbarScrolled || !isHome
                    ? "border-[#4eb7ac] bg-transparent text-[#4eb7ac] hover:bg-[#4eb7ac] hover:text-white"
                    : "border-white bg-white text-black hover:bg-[#4eb7ac] hover:text-white hover:border-[#4eb7ac]"
                }`}
            >
              Login
            </button>

            <button
              onClick={() => toggleModal("signup")}
              className={`border-2 font-bold py-2 px-4 rounded transition-all duration-200
                ${
                  isNavbarScrolled || !isHome
                    ? "border-[#4eb7ac] bg-transparent text-[#4eb7ac] hover:bg-[#4eb7ac] hover:text-white"
                    : "border-white bg-white text-black hover:bg-[#4eb7ac] hover:text-white hover:border-[#4eb7ac]"
                }`}
            >
              Sign up
            </button>
          </>
        )}
      </div>
      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 502 }}
      >
        <div>
          <img src={OtherPagesLogo} alt="logo" className="h-5 m-20" />
        </div>
        <div className="flex flex-col ml-5 space-y-4 mt-10">
          {isLoggedIn ? (
            <>
              <div className="flex flex-row gap-x-2 font-bold mb-16">
                <img
                  src={user}
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover cursor-pointer"
                />
                <span className="text-black mt-3 ml-3">Profile</span>
              </div>

              <Link to="/favourites">
                <div className="flex flex-row gap-x-2 mb-32">
                  <FaHeart className="text-xl text-[#EF4217FF]" />
                  <span className="text-black font-bold">Favourites</span>
                </div>
              </Link>

              <Link to="/notifications">
                <div className="flex flex-row gap-x-2 mb-16">
                  <FaBell className="text-xl text-[#4eb7ac]" />
                  <span className="text-black font-bold">Notification</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => toggleModal("login")}
                className="border-2 font-bold py-2 px-4 rounded text-[#4eb7ac] hover:bg-[#4eb7ac] hover:text-white mr-8 ml-8"
              >
                Login
              </button>
              <button
                onClick={() => toggleModal("signup")}
                className="border-2 font-bold py-2 px-4 rounded text-[#4eb7ac] hover:bg-[#4eb7ac] hover:text-white mr-8 ml-8"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
      {/* Ensure the page behind the sidebar is not clickable when sidebar is visible */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 transition-all duration-300 ${
          isSidebarVisible ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
        style={{ zIndex: 501 }}
      ></div>
      {/* Modal Pop-up for Login/Sign up */}
      {(isModalVisible === "login" || isModalVisible === "signup") && (
        <>
          {/* Shadow overlay */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
            style={{ zIndex: 9998 }}
            onClick={() => setIsModalVisible(null)} // Close modal when the overlay is clicked
          ></div>

          {/* Modal content */}
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[9999]">
            <div className="bg-white p-8 rounded-md w-1/3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl text-black">
                  {isModalVisible === "login" ? "Login" : "Sign up"}
                </h2>
                <button
                  onClick={() => setIsModalVisible(null)}
                  className="text-xl mb-2 text-[#EF4217FF]"
                >
                  X
                </button>
              </div>
              <div className="mt-4">
                {/* Buttons for Login/SignUp for Client/Agency */}
                <button
                  onClick={() => handleOptionClick("Client", isModalVisible)}
                  className="w-full px-4 py-2 border-2 mb-2 text-black font-semibold rounded-md hover:bg-[#4eb7ac] hover:text-white"
                >
                  Client
                </button>
                <button
                  onClick={() => handleOptionClick("Agency", isModalVisible)}
                  className="w-full px-4 py-2 border-2 text-black font-semibold rounded-md hover:bg-[#4eb7ac] hover:text-white"
                >
                  Agency
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
