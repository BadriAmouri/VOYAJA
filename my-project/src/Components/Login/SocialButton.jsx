import React from "react";
import '../../Style/Login_user.css';
import facebook from '../../assets/login/facebook.png';
import google from '../../assets/login/google.png';
import apple from '../../assets/login/Apple.png';


const SocialButtons = () => (
  <div className="social-buttons">
    <button className="facebook">
      <img src={facebook} alt="Facebook" />
    </button>
    <button className="google">
      <img src={google} alt="Google" />
    </button>
    <button className="apple">
      <img src={apple} alt="Apple" />
    </button>
  </div>
);

export default SocialButtons;
