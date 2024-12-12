
import React from "react";
import LoginForm from '../Components/Login/LoginForm';
import SocialButtons from '../Components/Login/SocialButton';
import Logo from '../Components/Login/Logo';
import '../Style/Login_user.css';
import coverImage from '../assets/coverimage.png';




const Login2 = () => (
    <div className="login-container">
      <div className="login-left">
        <LoginForm />
      </div>
      <div className="login-right">
        <img src={coverImage}  alt="Login"  className="loginimage"/>
      </div>
    </div>
  );
  
  export default Login2;






  