import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Get In Touch Section */}
        <div className="footer-section">
          <h3>Get In Touch</h3>
          <p>📍 #833, E.V.R. Periyar High Road, <br /> Arumbakkam, Chennai – 600 106</p>
          <p>📞 +91-9876543210</p>
          <p>
            <FaEnvelope /> contactqualidash@gmail.com
          </p>
        </div>

        {/* Popular Links Section */}
        <div className="footer-section popular-links">
          <h3>Popular Links</h3>
          <ul>
            <li>
              <Link to="/about" className="footer-link" onClick={scrollToTop}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="footer-link" onClick={scrollToTop}>
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful Links Section */}
        <div className="footer-section useful-links">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <Link to="/termsofuse" className="footer-link" onClick={scrollToTop}>
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="footer-link" onClick={scrollToTop}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="footer-link" onClick={scrollToTop}>
                Cookies
              </Link>
            </li>
            <li>
              <Link to="/help" className="footer-link" onClick={scrollToTop}>Help</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div className="footer-section footer-icons-container">
          <h3>Connect with us</h3>
          <div className="footer-icons">
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp style={{ color: "#25D366" }}/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook style={{ color: "#1877F2" }}/>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube style={{ color: "#FF0000" }}/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram style={{ color: "#C13584" }}/>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin style={{ color: "#0077B5" }}/>
            </a>
          </div>
          <a href="https://maps.app.goo.gl/APK4CAJZJnWm3AEC7" target="_blank" rel="noopener noreferrer" className="locate-us-button">
            Locate us
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; <span className="footer-brand">QualiDash</span>, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
