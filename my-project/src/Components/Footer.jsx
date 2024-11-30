import React from "react";
import "../Style/Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-bottom">
       {/*  <div className="logo">
          <a href="#"><img src="src\assets\Artboard 2@2x.png" alt="Globe Logo" /></a>
       <div className="social-icons">
        <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>

        </div>
        </div> */}
        
      </div>
        <div className="footer-section">
          <h4>Our Destinations</h4>
          <ul>
            <li><a href="#">Algeria</a></li>
            <li><a href="#">UAE</a></li>
            <li><a href="#">France</a></li>
            <li><a href="#">Turkey</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Our Activities</h4>
          <ul>
            <li><a href="#">Beach Visits</a></li>
            <li><a href="#">Mountain Hikes</a></li>
            <li><a href="#">Multi-activities</a></li>
            <li><a href="#">Historical Sites</a></li>
          </ul>
        </div>
       
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Work with Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact  Us</h4>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Work with Us</a></li>
          </ul>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
