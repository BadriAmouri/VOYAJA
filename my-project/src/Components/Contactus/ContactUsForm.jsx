
import React, { useState , useEffect } from "react";
import PasswordInput from "../Login/PasswordInput";
import RowInput from "../Login/RowInput";
import TermsCheckbox from "../Login/TermsCheckbox";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useAppContext } from "../../contexts/AppContext";

const ContactUsForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate=useNavigate();
  const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate phone number format
      const phoneRegex = /^0[567]\d{8}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setErrorMessage(
          "Invalid phone number. It should be of the format 0(5/6/7)XXXXXXXX"
        );
        return;
      }

      const response = await axios.post('http://localhost:5000/api/contactusrequest', {
        sender_user_id: clientID, // Replace with logged-in user ID
        receiver_admin_id: 1, // Set to the intended admin ID
        content: message,
        subject: subject,
   
      });

      setSuccessMessage(response.data.message);
      setFname("");
      setLname("");
      setEmail("");
      setPhoneNumber("");
      setSubject("");
      setMessage("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to send the message. Please try again later.");
    }
  };

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
      <input type="text" placeholder="Enter the subject" value={subject}  onChange =  {(e) => setSubject(e.target.value)}
       required={true}/>
       <textarea 
          placeholder="Enter your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="5"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none hover:border-[#24b574]"></textarea>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit" className="login-button">
        Send message
      </button>
    </form>
  );
};

export default ContactUsForm;
