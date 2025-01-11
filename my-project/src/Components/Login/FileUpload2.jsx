import React, { useRef } from "react";

const UploadFileComponent = ({ fileType, file, onFileChange }) => {
  const fileInputRef = useRef();

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileChange(fileType, selectedFile);
    }
  };

  return (
    <div className="upload-file-component">
      <div
        className="upload-box"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p> 📄 Click to upload your {fileType} pdf file</p>
        )}
      </div>
      <input
        type="file"
        // accept=".pdf, .jpg, .png"

        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadFileComponent;
