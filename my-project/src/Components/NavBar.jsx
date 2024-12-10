import React from "react";
import "../Style/NavBar.css";
import logo from "../assets/Artboard 2@2x (2).png";
import plane from "../assets/plane.png";
import profile from "../assets/pro.webp";
const Header = () => {
  return (
    <header className="header z-10">
      <div className="header-left">
        <nav className="nav-tabs tab">
          <a href="/" className="tab_link flex items-center gap-2">
            <img src={plane} alt="plane" className="plane" />
            Find trip
          </a>
        </nav>
      </div>
      <div className="header-center">
        <a href="/" className="logo">
          <img src={logo} alt="Voyaja Logo" />
        </a>
      </div>
      <div className="header-right">
        <div className=" nav-tabs favorites">
          <a href="/" className="favorite">
            🖤 Favourites
          </a>
        </div>
        <div className="nav-tabs profile">
          <img src={profile} alt="Profile" />
          <a href="/" className="profileA">
            Rania Litim
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
