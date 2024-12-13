
import React, { useState , useEffect } from "react";
import PasswordInput from "./PasswordInput";
import RowInput from "./RowInput";
import TermsCheckbox from "./TermsCheckbox";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useAppContext } from "../../contexts/AppContext";

const SignUpForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate=useNavigate();

  const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext();



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^0[567]\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage(
        "Invalid phone number. It should be of the format 0(5/6/7)XXXXXXXX"
      );
      return;
    }

    // Validate checkbox agreement
    if (!checkboxChecked) {
      setErrorMessage("You must agree to the Terms and Privacy Policies");
      return;
    }

    try {
      // Call the backend API
      const response = await axios.post("/client/signup", {
        fname,
        lname,
        email,
        phonenumber: phoneNumber,
        password,
      });
      // Log the full backend response
      console.log("Backend response:", response.data.client_id);
      setClientID(response.data.client_id);
      setSuccessMessage(response.data.message);
      setIsLoggedIn(true);
      console.log("are you logged in RANIA ", isLoggedIn)
      setErrorMessage(""); // Clear any errors
      navigate("/Home"); 

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");

    }
  };
  useEffect(() => {
    console.log("The Sign up info are : " + fname , lname,email,phoneNumber,password );

  }, [fname , lname,email,phoneNumber,password]); // Dependency array
  return (
    <form onSubmit={handleSubmit}>
      <RowInput
        inputs={[
          {
            type: "text",
            placeholder: "Enter your First Name",
            value: fname,
            onChange: (e) => setFname(e.target.value),
            required: true,
          },
          {
            type: "text",
            placeholder: "Enter your Last Name",
            value: lname,
            onChange: (e) => setLname(e.target.value),
            required: true,
          },
        ]}
      />
      <RowInput
        inputs={[
          {
            type: "email",
            placeholder: "Enter your Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
          },
          {
            type: "text",
            placeholder: "Enter your Phone Number",
            value: phoneNumber,
            onChange: (e) => setPhoneNumber(e.target.value),
            required: true,
          },
        ]}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <TermsCheckbox
        checked={checkboxChecked}
        onChange={(e) => setCheckboxChecked(e.target.checked)}
      />
      <button type="submit" className="login-button">
        Create Account
      </button>
      <p className="signup-text">
        Already have an account? <a href="/Login">Login</a>
      </p>
    </form>
  );
};

export default SignUpForm;
