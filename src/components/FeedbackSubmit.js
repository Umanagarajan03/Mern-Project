import React, { useEffect } from 'react';
import './FeedbackSubmit.css'; // Make sure to create a CSS file for styling

const FeedbackSubmit = () => {
  useEffect(() => {
    // Automatically redirect to Help page after 2 seconds
    const timer = setTimeout(() => { 
      window.location.href = '/help'; // Redirect to Help page 
    }, 2000);

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="feedsub-container">
      <div className="feedsub-message-box">
        <div className="checkmark">✔️</div>
        <div className="feedsub-thank-you">Thank you for your feedback!</div>
        <div className="feedsub-footer">
          Made with Fillout, the easy way to make stunning forms
        </div>
      </div>
    </div>
  );
};

export default FeedbackSubmit;