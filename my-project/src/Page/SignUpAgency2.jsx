import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../Components/Login/FileUpLoad";
import Logo from "../Components/Login/Logo";
import coverImage from "../assets/coverimage.png";


const SignUp_Agence2 = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    agreement: null,
    registration: null,
  });

  const handleFileUpload = (fileType, file) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: file,
    }));
  };

  const handleRemoveFile = (fileType) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: null,
    }));
  };

  const handleSubmit = () => {
    navigate("/HomeScreen");
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

        {/* Agreement Upload Section */}
        <FileUpload
          fileType="agreement"
          file={files.agreement}
          onFileChange={handleFileUpload}
          onRemoveFile={handleRemoveFile}
        />

        {/* Registration Upload Section */}
        <FileUpload
          fileType="registration"
          file={files.registration}
          onFileChange={handleFileUpload}
          onRemoveFile={handleRemoveFile}
        />

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Create Account
        </button>
        <p className="signup-text">
          Already have an account? <a href="/Login2">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp_Agence2;
