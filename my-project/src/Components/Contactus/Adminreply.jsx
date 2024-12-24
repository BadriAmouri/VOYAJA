import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from "../../contexts/AppContext";
import { Link } from 'react-router-dom';

const Adminreply = ({userid}) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, clientID, setClientID } = useAppContext();
  console.log("debug admincomponent reply:", userid);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Trim inputs to avoid issues
    const payload = {
      sender_admin_id: 1,
      reciever_user_id: Number(userid), // Convert to number
      content: message.trim(),         // Remove extra spaces
      subject: subject.trim(),         // Remove extra spaces
    };
  
    console.log("Payload being sent:", payload);
  
    try {
      const response = await axios.post('http://localhost:5000/api/contactusreply', payload);
      console.log("Response from backend:", response.data);
      setSuccessMessage("Message sent successfully!");
      setErrorMessage(""); // Clear any error message
    } catch (error) {
      if (error.response) {
        console.error("Backend error response:", error.response.data);
      } else {
        console.error("Request error:", error.message);
      }
      setErrorMessage("Failed to send the message. Please try again later.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter the subject" 
        value={subject}  
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea 
        placeholder="Enter your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows="5"
        className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none hover:border-[#24b574]"
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button type="submit" className="login-button">
        Send message
      </button>
      <Link to="/admin/notifications">
      <button className="mt-5 login-button" >
        Close form
      </button>
      </Link>
    </form>
  );
};

export default Adminreply;
