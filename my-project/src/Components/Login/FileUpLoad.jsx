import React from "react";

const FileUpload = ({ fileType, file, onFileChange, onRemoveFile }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(fileType, file);
    }
  };

  const handleRemoveFile = () => {
    onRemoveFile(fileType);
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
          <div style={styles.fileIcon}>📄</div>
          <div style={styles.fileInfo}>
            <span>{file.name}</span>
            <span>{file.type}</span>
          </div>
          <div style={styles.deleteIcon} onClick={handleRemoveFile}>
            ✕
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  documents: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
    marginBottom: "20px",
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
    color: "white",
  },
  fileInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  deleteIcon: {
    cursor: "pointer",
    fontSize: "22px",
    color: "#4EB7AC",
    fontWeight: "bold",
  },
};

export default FileUpload;
