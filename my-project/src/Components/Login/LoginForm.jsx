import React from "react";
import PasswordInput from "./PasswordInput";
import '../../Style/Login_user.css';
import "./Logo";
import Logo from "./Logo";
import SocialButtons from './SocialButton';



const LoginForm = () => (

  <div className="login-form">
        <Logo/>
        <h2 className="formh2">Login</h2>
    <p>Login to access your VOYAJA account</p>
    <form>
      <label>Email</label>
      <input type="email" placeholder="john.doe@gmail.com" required />
      <PasswordInput label="Password" placeholder="Enter your password" />
      <div className="options">
        <a href="/ForgotPassword" className="forgot-password">
          Forgot Password
        </a>
      </div>
      <button type="submit" className="login-button" href="homescreen">
        Login
      </button>
      <p className="signup-text">
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
    <div className="divider">--------------- Or login with ---------------</div>
    <SocialButtons />
    </div>
);

export default LoginForm;
