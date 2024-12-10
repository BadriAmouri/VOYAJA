// import React from "react";
// import { useNavigate } from "react-router-dom";
// import SignUpAgencyForm from '../Components/Login/SignUpAgencyForm';
// import Logo from '../Components/Login/Logo';
// import coverImage from '../assets/coverimage.png';


// const SignUp_Agence = () => {
//     const navigate = useNavigate();
  
//     const handleFormSubmit = () => {
//       navigate("/SignUp_Agence2");
//     };
  
//     return (
//       <div className="login-container">
//         <div className="login-image">
//         <img src={coverImage}  alt="Login"  className="loginimage"/>
//         </div>
//         <div className="login-form">
//           <Logo />
//           <h2>Sign Up</h2>
//           <p>Let’s get you all set up so you can access your personal account.</p>
//           <SignUpAgencyForm onSubmit={handleFormSubmit} />
//           <p className="signup-text">
//             Already have an account? <a href="/Login">Login</a>
//           </p>
//         </div>
//       </div>
//     );
//   };
  
//   export default SignUp_Agence;


import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpAgencyForm from "../Components/Login/SignUpAgencyForm";
import Logo from "../Components/Login/Logo";
import coverImage from "../assets/coverimage.png";

const SignUp_Agence = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    navigate("/SignUp_Agence2");
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
        {/* Pass the onSubmit function directly to the form */}
        <SignUpAgencyForm onSubmit={handleFormSubmit} />
        <p className="signup-text">
          Already have an account? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp_Agence;
