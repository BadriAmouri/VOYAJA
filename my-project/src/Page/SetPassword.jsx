import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Components/Login/PasswordInput";
import coverImage from "../assets/coverimage.png";
import Logo from "../Components/Login/Logo";
import axios from "axios";
import { useLocation } from "react-router-dom";




const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType;
  const email = location.state?.email || localStorage.getItem("email");


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate passwords
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      // await axios.post("/client/resetpassword", { password });
    
       const response = await axios.post("/password/setpassword", {
     email,
             password,
             userType,

       });
     
      // setSuccessMessage(response.data.message);
      setErrorMessage(""); // Clear any errors

      // Redirect based on userType
      if (userType === "client") {
        navigate("/");
      } else if (userType === "agency") {
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error(error);
    }
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
          <button type="submit" className="login-button"  >
            Set Password
          </button>

         
        </form>
      </div>
    </div>
  );
};

export default SetPassword;

