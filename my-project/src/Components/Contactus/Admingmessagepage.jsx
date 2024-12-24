import React, { useState } from "react";
import "../../Style/upload.css";
import { Link } from "react-router-dom";
const Adminmessage = ({ id,content,subject }) => {

  return (
    <div className="app-container flex flex-col gap-4">
      {/* First Row: Message and Instructions */}
      <div className="confirmation-message">

       <h2 className="font-semibold">{subject}</h2> {/* here we put the subject */}
      {  console.log(`trying to debug The message is: ${content}`)}
      {  console.log(`trying to debug The ID in message page  is: ${id}`)}
        <p>{content}</p> {/* here we put the messag sent by the user  */}
      
        {/* reply button takes us to the form where admin reply */}
        <Link  to={`/Adminreplypage/${id}`}>
        <button type="submit" className="submit-btn_reciept">
        Reply
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Adminmessage;
