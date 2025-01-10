// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FileUpload from "../Components/Login/FileUpLoad";
// import Logo from "../Components/Login/Logo";
// import coverImage from "../assets/coverimage.png";


// const SignUp_Agence2 = () => {
//   const navigate = useNavigate();
//   const [files, setFiles] = useState({
//     agreement: null,
//     registration: null,
//   });

//   const handleFileUpload = (fileType, file) => {
//     setFiles((prevFiles) => ({
//       ...prevFiles,
//       [fileType]: file,
//     }));
//   };

//   const handleRemoveFile = (fileType) => {
//     setFiles((prevFiles) => ({
//       ...prevFiles,
//       [fileType]: null,
//     }));
//   };

//   const handleSubmit = () => {
//     navigate("/Dashboard");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image">
//       <img src={coverImage}  alt="Login"  className="loginimage"/>
//       </div>
//       <div className="login-form">
//         <Logo />
//         <h2>Sign Up</h2>
//         <p>Let’s get you all set up so you can access your personal account.</p>

//         {/* Agreement Upload Section */}
//         <FileUpload
//           fileType="agreement"
//           file={files.agreement}
//           onFileChange={handleFileUpload}
//           onRemoveFile={handleRemoveFile}
//         />

//         {/* Registration Upload Section */}
//         <FileUpload
//           fileType="registration"
//           file={files.registration}
//           onFileChange={handleFileUpload}
//           onRemoveFile={handleRemoveFile}
//         />

//         <button type="submit" className="login-button" onClick={handleSubmit}>
//           Create Account
//         </button>
//         <p className="signup-text">
//           Already have an account? <a href="/Login2">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp_Agence2;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadFileComponent from "../Components/Login/FileUpload2";
import Logo from "../Components/Login/Logo";
import coverImage from "../assets/coverimage.png";
import { useLocation } from "react-router-dom";


const SignUp_Agence2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("email");

  console.log(email);
  const [files, setFiles] = useState({
    agreement: null,
    registration: null,
  });

  const handleFileUpload = (fileType, file) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: file,
    }));
  };

  // const handleSubmit = async () => {
  //   if (!files.agreement || !files.registration) {
  //     alert("Please upload both the agreement and registration files.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("agreement", files.agreement);
  //   formData.append("registration", files.registration);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/upload",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log("Files uploaded successfully:", response.data);
  //     navigate("/Dashboard");
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //     alert("Failed to upload files. Please try again.");
  //   }
  // };

  const handleSubmit = async () => {
    if (!files.agreement || !files.registration) {
      alert("Please upload both files before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("agreement", files.agreement);
    formData.append("registration", files.registration);
  
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Files uploaded successfully:", response.data);
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={coverImage} alt="Login" className="loginimage" />
      </div>
      <div className="login-form">
        <Logo />
        <h2>Sign Up</h2>
        <p>Let’s get you all set up so you can access your personal account.</p>

        {/* Agreement Upload Section */}
        <UploadFileComponent
          fileType="agreement"
          file={files.agreement}
          onFileChange={handleFileUpload}
        />

        {/* Registration Upload Section */}
        <UploadFileComponent
          fileType="registration"
          file={files.registration}
          onFileChange={handleFileUpload}
        />

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Create Account
        </button>
        <p className="signup-text">
          Already have an account? <a href="/Login2">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp_Agence2;
