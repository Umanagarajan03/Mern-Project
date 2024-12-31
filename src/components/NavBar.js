import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/QD.png";
import "./NavBar.css";

function NavBar({ openModal, isAuthenticated, handleLogout }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  return (
    <nav className="navbar">
      <div className="navbar-inner">
      <div className="navbar-logo">
            <img src={Logo} alt="Logo" />
          </div>
        <div className="navbar-left navbar-sections">

          <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className={`navbar-link ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-center">
          <span className="navbar-brand">QualiDash</span>
        </div>
        <ul className={`navbar-right navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/about" className={`navbar-link ${location.pathname === "/about" ? "active" : ""}`}>About Us</Link>
          </li>
          <li>
            <Link to="/contact" className={`navbar-link ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="profile-dropdown">
                <FontAwesomeIcon
                  icon={faUser}
                  className="profile-icon"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={handleLogout} className="dropdown-item">
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openModal} className="navbar-signin-button">
                <FontAwesomeIcon icon={faUser} /> Sign In
              </button>
            )}
          </li>
        </ul>
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
