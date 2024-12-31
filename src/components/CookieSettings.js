import React, { useEffect, useState } from "react";
import "./CookieSettings.css";
import cookieImage from "../assets/QD.png"; // Path to your cookie image
import { Link, useNavigate } from "react-router-dom"; // Import the Link component and useNavigate hook

const CookieSettings = ({ toggleSettings }) => {
  const [isHiding, setIsHiding] = useState(false);
  const [isChecked, setIsChecked] = useState({
    "Performance-cookies": false,
    "analytics-cookies": false,
    "functional-cookies": false,
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenCookiePopup");
    if (!hasSeenPopup) {
      toggleSettings(true); // Show the popup if the user hasn't seen it
    }
  }, [toggleSettings]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Function to handle close behavior when the close button is clicked
  const handleClose = () => {
    setIsHiding(true); // Start fade-out animation
    setTimeout(() => {
      toggleSettings(false); // Hide the box after animation
      localStorage.setItem("hasSeenCookiePopup", "true"); // Set flag in local storage
    }, 500); // Match the animation duration
  };

  // Function to handle Save Settings
  const handleSaveSettings = () => {
    // Check if any checkbox is selected
    if (Object.values(isChecked).includes(true)) {
      setIsHiding(true); // Start fade-out animation
      setTimeout(() => {
        toggleSettings(false); // Hide the box after animation
        localStorage.setItem("hasSeenCookiePopup", "true"); // Set flag in local storage
      }, 500);
    } else {
      setErrorMessage("Please select at least one cookie preference."); // Show error message
    }
  };

  // Function to handle Cookie Policy link click (close modal and navigate)
  const handlePolicyLinkClick = () => {
    setIsHiding(true); // Start fade-out animation
    setTimeout(() => {
      toggleSettings(false); // Hide the modal after animation
      localStorage.setItem("hasSeenCookiePopup", "true"); // Set flag in local storage
      navigate("/cookie-policy"); // Navigate to the cookie policy page
    }, 500); // Match the animation duration
  };

  return (
    <>
      <div className="cookie-settings-overlay"></div>
      <div className={`cookie-settings-box ${isHiding ? "hide" : "show"}`}>
        <div className="cookie-settings-content">
          {/* Cookie image */}
          <img src={cookieImage} alt="Cookie Illustration" className="cookie-image" />
          {/* Close button */}
          <span className="close-button" onClick={handleClose}>&times;</span>
          <h1 id="cs-h1">Cookie Settings</h1>
          <p id="cs-p">Here you can customize your cookie preferences:</p>
          <div>
            <label>
              <input
                type="checkbox"
                name="Performance-cookies"
                checked={isChecked["Performance-cookies"]}
                onChange={handleCheckboxChange}
              />
              Performance Cookies
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="analytics-cookies"
                checked={isChecked["analytics-cookies"]}
                onChange={handleCheckboxChange}
              />
              Analytics Cookies
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="functional-cookies"
                checked={isChecked["functional-cookies"]}
                onChange={handleCheckboxChange}
              />
              Functional Cookies
            </label>
          </div>

          {/* Display error message if no checkboxes are selected */}
          {errorMessage && <p id="cs-p" className="error-message">{errorMessage}</p>}

          {/* Save Settings button */}
          <button onClick={handleSaveSettings}>Save Settings</button>

          {/* Cookies Policy Section */}
          <div className="cookies-policy">
            <p id="cs-p">
              By using this site, you consent to our use of cookies. For more information, please visit our{" "}
              <Link to="/cookie-policy" onClick={handlePolicyLinkClick}>Cookie Policy</Link> page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieSettings;
