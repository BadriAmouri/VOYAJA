import React from "react";
import "../Style/Home_Nav_Bar.css";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <div className="header">
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
          <Link to='/Login'>
          <a href="/" className="LOGIN">Login</a >
          </Link>
        </div>
        <div className=" SignUp">
          <Link to='/SignUp'>
          <a href="/" className="SIGNUP">Sign up </a >
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
