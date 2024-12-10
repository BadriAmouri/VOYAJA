import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Style/Login_user.css';
import SocialButtons from "../Components/Login/SocialButton";
import coverImage from "../assets/coverimage.png";
import Logo from "../Components/Login/Logo";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate the password recovery process
    navigate("/VerifyPasswordCode");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Logo /> {/* Use Logo component */}
        <h2>Forgot your Password?</h2>
        <p>Don’t worry, happens to all of us. Enter your email below to recover your password.</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
        <div className="divider">--------------- Or login with ---------------</div>
        <SocialButtons /> {/* Social login buttons */}
      </div>
      <div className="login-image">
      <img src={coverImage} alt="Login" className="loginimage" />
      </div>
    </div>
  );
};

export default ForgotPassword;
