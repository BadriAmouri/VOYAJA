import React from "react";
import { useNavigate } from "react-router-dom";
import '../Style/SignUp_User.css';
import SignUpForm from '../Components/Login/SignUpForm';
import SocialButtons from '../Components/Login/SocialButton';
import Logo from '../Components/Login/Logo';
import coverImage from '../assets/coverimage.png';

const SignUp = () => {
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

        <h2>Sign Up</h2>
        <p>Let’s get you all set up so you can access your personal account.</p>
        <SignUpForm onSubmit={handleFormSubmit} />
        <div className="divider">Or Sign Up with</div>
        <SocialButtons />
      </div>
    </div>
  );
};

export default SignUp;
