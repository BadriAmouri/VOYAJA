import React from "react";
import { useNavigate } from "react-router-dom";
import '../Style/SignUp_User.css';
import ContactUsForm from '../Components/Contactus/ContactUsForm.jsx';
import SocialButtons from '../Components/Login/SocialButton';
import Logo from '../Components/Login/Logo';
import coverImage from '../assets/coverimage.png';

const Contactuspage = () => {
  const navigate = useNavigate();

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

        <h2>Contact Us </h2>
        <p>We’re Here to Address Your Questions and Concerns.</p>
        <ContactUsForm onSubmit={handleFormSubmit} />
        <div className="divider">Or Contact Us Via</div>
        <SocialButtons />
      </div>
    </div>
  );
};

export default Contactuspage;
