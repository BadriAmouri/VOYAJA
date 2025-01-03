// import React from "react";
// import PasswordInput from "./PasswordInput";
// import '../../Style/Login_user.css';
// import "./Logo";
// import Logo from "./Logo";
// import SocialButtons from './SocialButton';



// const LoginForm = () => (

//   <div className="login-form">
//         <Logo/>
//         <h2 className="formh2">Login</h2>
//     <p>Login to access your VOYAJA account</p>
//     <form>
//       <label>Email</label>
//       <input type="email" placeholder="john.doe@gmail.com" required />
//       <PasswordInput label="Password" placeholder="Enter your password" />
//       <div className="options">
//         <a href="/ForgotPassword" className="forgot-password">
//           Forgot Password
//         </a>
//       </div>
//       <button type="submit" className="login-button" href="homescreen">
//         Login
//       </button>
//       <p className="signup-text">
//         Don’t have an account? <a href="/signup">Sign up</a>
//       </p>
//     </form>
//     <div className="divider">--------------- Or login with ---------------</div>
//     <SocialButtons />
//     </div>
// );

// export default LoginForm;


// import React, { useState } from "react";
// import PasswordInput from "./PasswordInput";
// import '../../Style/Login_user.css';
// import Logo from "./Logo";
// import SocialButtons from './SocialButton';

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/client", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         // Redirect to a success page (backend handles redirection or return JSON to handle here)
//         const data = await response.json();
//         console.log("Login successful", data);
//         window.location.href = "/homescreen"; // Adjust the route as needed
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrorMessage("An unexpected error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="login-form">
//       <Logo />
//       <h2 className="formh2">Login</h2>
//       <p>Login to access your VOYAJA account</p>
//       <form onSubmit={handleLogin}>
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="john.doe@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <PasswordInput
//           label="Password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="options">
//           <a href="/ForgotPassword" className="forgot-password">
//             Forgot Password
//           </a>
//         </div>
//         <button type="submit" className="login-button">
//           Login
//         </button>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <p className="signup-text">
//           Don’t have an account? <a href="/signup">Sign up</a>
//         </p>
//       </form>
//       <div className="divider">--------------- Or login with ---------------</div>
//       <SocialButtons />
//     </div>
//   );
// };

// export default LoginForm;


import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import "../../Style/Login_user.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (event) => {
  //   event.preventDefault(); // Prevent form reload on submission

  //   try {
  //     // Send the email and password to the backend
  //     const response = await fetch("http://localhost:5000/client", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }), // Payload to send
  //     });

  //     const result = await response.json();

  //     // Handle response
  //     if (response.ok) {
  //       alert(result.message || "Login successful!");
  //       navigate("/signup"); // Navigate to home screen

  //       // Redirect or handle success (e.g., navigate to another page)
  //     } else {
  //       alert(result.message || "Login failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     alert("An error occurred. Please try again later.");
  //   }
  // };

  // const handleLogin = async (event) => {
  //   event.preventDefault(); // Prevent form reload on submission
  //   console.log('Form submitted with email:', email, 'and password:', password);
  
  //   try {
  //     // Log request details before sending
  //     console.log('Sending data to backend...');
  //     const response = await fetch("http://localhost:5000/client", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }), // Payload to send
  //     });
  
  //     const result = await response.json();
  //     console.log('Backend response:', result);
  
  //     // Handle response
  //     if (response.ok) {
  //       alert(result.message || "Login successful!");
  //       navigate("/signup"); // Navigate to another page
  //     } else {
  //       // alert(result.message || "Login failed. Please try again.");
  //     }
  //   } catch (error) {
  //   }
  // };
  

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form reload on submission
    console.log('Form submitted with email:', email, 'and password:', password);
  
    try {
      // Log request details before sending
      console.log('Sending data to backend...');
      const response = await fetch("http://localhost:5000/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Payload to send
      });
  
      const result = await response.json();
      console.log('Backend response:', result);
  
      // Handle response
      if (response.ok) {
        alert(result.message || "Login successful!");
        navigate("/"); // Navigate to signup page after login
      } else {
        alert(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="login-form">
      <h2 className="formh2">Login</h2>
      <p>Login to access your VOYAJA account</p>
      <form onSubmit={handleLogin}>
        {/* Email Field */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          required
        />

        {/* Password Field */}
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />

        {/* Forgot Password */}
        <div className="options">
          <a href="/ForgotPassword" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="login-button"  >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
