import React from "react";
import { useNavigate } from "react-router-dom";
import '../Style/SignUp_User.css';
import Adminreply from '../Components/Contactus/Adminreply.jsx';
import Logo from '../Components/Login/Logo';
import coverImage from '../assets/coverimage.png';
import {useParams } from 'react-router-dom';

const Adminreplypage = () => {
  const navigate = useNavigate();

  const { userid } = useParams(); // Extract the user ID from the URL

  console.log("debug adminpage:", userid); // Check if userId is being correctly passed from UR
  const handleFormSubmit = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-image">
      <img src={coverImage}  alt="Login"  className="loginimage"/>
      </div>
      <div className="login-form">
      <Logo />

        <h2>Admin Response</h2>
        <p>Please use the form below to reply to user inquiries or address their concerns.</p>
        <Adminreply userid={userid}  onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default Adminreplypage;
