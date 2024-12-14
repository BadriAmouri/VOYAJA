// import React, { useState } from "react";
// import PasswordInput from "./PasswordInput";
// import RowInput from "./RowInput";
// import TermsCheckbox from "./TermsCheckbox";

// const SignUpAgencyForm = ({ onSubmit }) => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [checkboxChecked, setCheckboxChecked] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate passwords
//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match");
//       return;
//     }

//     // Validate phone number
//     const phoneRegex = /^0[567]\d{8}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       setErrorMessage(
//         "Invalid phone number. It should be of the format 0(5/6/7)XXXXXXXX"
//       );
//       return;
//     }

//     // Validate checkbox
//     if (!checkboxChecked) {
//       setErrorMessage("You must agree to the Terms and Privacy Policies");
//       return;
//     }

//     // If all validations pass
//     setErrorMessage("");
//     onSubmit();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <RowInput
//         inputs={[
//           { type: "text", placeholder: "Enter Agency Name", required: true },
//           { type: "text", placeholder: "Enter Location", required: true },
//         ]}
//       />
//       <RowInput
//         inputs={[
//           {
//             type: "email",
//             placeholder: "Enter your Email",
//             required: true,
//           },
//           {
//             type: "text",
//             placeholder: "Enter your Phone Number",
//             value: phoneNumber,
//             onChange: (e) => setPhoneNumber(e.target.value),
//             required: true,
//           },
//         ]}
//       />
//       <PasswordInput
//         label="Password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <PasswordInput
//         label="Confirm Password"
//         placeholder="Confirm your password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
//       <TermsCheckbox
//         checked={checkboxChecked}
//         onChange={(e) => setCheckboxChecked(e.target.checked)}
//       />
//       {/* Display error message here if any */}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <button type="submit" className="login-button">
//         Continue
//       </button>
//     </form>
//   );
// };

// export default SignUpAgencyForm;

import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import RowInput from "./RowInput";
import TermsCheckbox from "./TermsCheckbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate=useNavigate();
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
      const response = await axios.post("/api/signup", {
        name,
        location,
        email,
        phonenumber: phoneNumber,
        password,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage(""); // Clear any errors
      navigate("/SignUp_Agence2"); 

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <RowInput
        inputs={[
          {
            type: "text",
            placeholder: "enter Agency name",
            value: name,
            onChange: (e) => setname(e.target.value),
            required: true,
          },
          {
            type: "text",
            placeholder: "enter the location ",
            value: location,
            onChange: (e) => setlocation(e.target.value),
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
      
    </form>
  );
};

export default SignUpForm;
