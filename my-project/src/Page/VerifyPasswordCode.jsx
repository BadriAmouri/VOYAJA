import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/Login_user.css';
import Logo from "../Components/Login/Logo";
import coverImage from "../assets/coverimage.png";




const VerifyPasswordCode = () => {
  const [code, setCode] = useState(""); // Track the entered code
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate verification of the code
    navigate("/SetPassword"); 
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Logo /> {/* Use Logo component */}
        <h2>Verify Code</h2>
        <p>An authentication code has been sent to your email.</p>
        <form onSubmit={handleSubmit}>
          <label>Enter code</label>
          <input
            type="text"
            placeholder="XXXXXXXX"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="code-input" // Add class for styling
          />
          <button type="submit" className="login-button">
            Verify
          </button>
        </form>
        <div>
          Didn’t receive a code? <a href="#" className="resend-link">Resend</a>
        </div>
      </div>
      <div className="login-image">
      <img src={coverImage} alt="Login" className="loginimage" />
      </div>
    </div>
  );
};

export default VerifyPasswordCode;
