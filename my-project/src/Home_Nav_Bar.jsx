import React from "react";
import "./Home_Nav_Bar.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        
        <nav className="nav-tabs tab">
        <img src="src\assets\plane.png" alt="" />

          <a href="/" className="tab_link">Find offer</a>
   
        </nav>
      </div>
      <div className="header-center"><a href="/" className="logo">
          <img src="src\assets\Artboard 2@2x (2).png" alt="Voyaja Logo" />
        </a></div>
      <div className="header-right">
        <div className="  Login">
          <a href="/" className="LOGIN">Login</a >
        </div>
        <div className=" SignUp">
          <a href="/" className="SIGNUP">Sign up </a >
        </div>
      </div>
    </header>
  );
};

export default Header;
