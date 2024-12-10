import React, { useState } from "react";
import ClosedEye from '../../assets/login/ClosedEye.png';
import openEye from '../../assets/login/openEye.png';
import '../../Style/Login_user.css';


const PasswordInput = ({ label, placeholder }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <><label>{label}</label><div className="password-input">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
        required />
      <button
        type="button"
        className="toggle-password"
        onClick={togglePasswordVisibility}
      >
        <img
          src={passwordVisible
            ? openEye
            : ClosedEye}
          alt={passwordVisible ? "Hide password" : "Show password"} />
      </button>
    </div></>
  );
};

export default PasswordInput;
