import React, { useState } from 'react';

const FileUploadForm = () => {
  const [passportFile, setPassportFile] = useState(null);
  const [paymentReceiptFile, setPaymentReceiptFile] = useState(null);

  const handlePassportChange = (event) => {
    setPassportFile(event.target.files[0]);
  };

  const handlePaymentReceiptChange = (event) => {
    setPaymentReceiptFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passportFile || !paymentReceiptFile) {
      alert('Please upload both files.');
    } else {
      alert(`Passport: ${passportFile.name}, Payment Receipt: ${paymentReceiptFile.name}`);
    }
  };

  return (
    <div className="file-upload-form">
      <h3>Upload Documents</h3>
      <form onSubmit={handleSubmit}>
        {/* Passport Upload */}
        <div className="file-input-container">
          <label className="custom-file-upload">
            <input 
              type="file" 
              onChange={handlePassportChange} 
              accept=".pdf, .jpg, .png" 
              required 
            />
            <span className="upload-icon">📂</span> Upload Passport
          </label>
          {passportFile && <p className="file-name">Passport File: {passportFile.name}</p>}
        </div>

        {/* Payment Receipt Upload */}
        <div className="file-input-container">
          <label className="custom-file-upload">
            <input 
              type="file" 
              onChange={handlePaymentReceiptChange} 
              accept=".pdf, .jpg, .png" 
              required 
            />
            <span className="upload-icon">📂</span> Upload Payment Receipt
          </label>
          {paymentReceiptFile && <p className="file-name">Payment Receipt: {paymentReceiptFile.name}</p>}
        </div>

        <button type="submit" className="left-aligned-btn">Submit</button> </form>
    </div>
  );
};

export default FileUploadForm;
