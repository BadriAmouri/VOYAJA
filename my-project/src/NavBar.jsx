import React from "react";
import "./NavBar.css";
const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        
        <nav className="nav-tabs tab">
          <img src="src\assets\plane.png" alt="" />
          <a href="/" className="tab_link"> Find trip</a>
   
        </nav>
      </div>
      <div className="header-center"><a href="/" className="logo">
          <img src="src\assets\Artboard 2@2x (2).png" alt="Voyaja Logo" />
        </a></div>
      <div className="header-right">
        <div className=" nav-tabs favorites">
          <a href="/" className="favorite">🖤 Favourites</a >
        </div>
        <div className="nav-tabs profile">
          <img src="src\assets\pro.webp" alt="Profile" />
          <a href="/" className="profileA">Rania Litim</a >
        </div>
      </div>
    </header>
  );
};

export default Header;
