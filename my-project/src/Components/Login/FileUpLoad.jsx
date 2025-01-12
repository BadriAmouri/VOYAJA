
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const FileUpload = ({ fileType, file, onFileChange, onRemoveFile }) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(fileType, file);
    }
  };

  const handleRemoveFile = () => {
    onRemoveFile(fileType);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    // Add email and files to FormData
    formData.append("email", email);
    console.log(email);
    formData.append("file1", file); // Assuming you are uploading one file
    console.log("Uploading formData:", Array.from(formData.entries()));
    // Add the second file if it exists
    const secondFile = fileType === 'file2' ? file : null; // You can check for the second file
    if (secondFile) {
      formData.append("file2", secondFile);
    }

    try {
      const response = await fetch("http://localhost:5000/agency/uploadfile", {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Files uploaded successfully:', result);
      } else {
        console.error('Error uploading files:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.documents}>
      {!file && (
        <div style={styles.uploadBox} onClick={() => document.getElementById(fileType).click()}>
          <div style={styles.plus}>+</div>
          <div style={styles.text}>Upload your {fileType}</div>
          <input
            id={fileType}
            type="file"
            style={styles.fileInput}
            onChange={handleFileUpload}
          />
        </div>
      )}
      {file && (
        <div style={styles.fileDetails}>
          <div style={styles.fileIcon}>📄 
            <div className="filename">{file.name}</div>
          </div>
          <div style={styles.deleteIcon} onClick={handleRemoveFile}>
            ✕
          </div>
        </div>
      )}
      {/* Add a button to trigger the upload */}
      {file && (
        <button onClick={handleUpload} style={{ marginTop: "20px" }}>
          Upload Files
        </button>
      )}
    </div>
  );
};

const styles = {
  documents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: "9px",
  },
  uploadBox: {
    width: "80%",
    height: "150px",
    border: "2px dashed #77c5c8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    marginTop: "10px",
  },
  plus: {
    fontSize: "24px",
    color: "#77c5c8",
    fontWeight: "bold",
  },
  text: {
    marginTop: "10px",
    color: "#777",
    fontSize: "16px",
    textAlign: "center",
  },
  fileInput: {
    display: "none",
  },
  fileDetails: {
    width: "80%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "2px solid #4EB7AC",
  },
  fileIcon: {
    fontSize: "20px",
    color: "black",
    display: "flex",
    gap: "20px",
  },
  deleteIcon: {
    cursor: "pointer",
    fontSize: "22px",
    color: "#4EB7AC",
    fontWeight: "bold",
  },
};

export default FileUpload;
