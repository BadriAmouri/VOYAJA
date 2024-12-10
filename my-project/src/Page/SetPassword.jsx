import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Components/Login/PasswordInput";
import coverImage from "../assets/coverimage.png";
import Logo from "../Components/Login/Logo";



const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");
    // Navigate to home screen after successful password reset
    navigate("/homescreen");
  };

  return (
    <div className="login-container">
      <div className="login-image">
      <img src={coverImage} alt="Login" className="loginimage" />
      </div>
      <div className="login-form">
       <Logo/>
        <h2>Set a password</h2>
        <p>Your previous password has been reset. Please set a new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="Create Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Re-enter Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
