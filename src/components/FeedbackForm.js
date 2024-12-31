import React, { useState } from 'react';
import './FeedbackForm.css';
import FeedbackSubmit from './FeedbackSubmit';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(''); // State to handle error messages
  const [loading, setLoading] = useState(false); // State to handle loading spinner

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate rating and feedback
    if (rating === 0 || feedback.trim() === '') {
      setError('Please provide a rating and feedback before submitting.');
      return; 
    }

    // Set loading to true when submission starts
    setLoading(true);

    try {
      const response = await fetch('https://qualidash-backend.onrender.com/api/feedback/submit', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, feedback }),
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Parse the response

      if (response.ok) {
        // Successfully submitted the feedback
        console.log('Feedback submitted successfully');
        setIsSubmitted(true); // Show FeedbackSubmit component after submission
        setError(''); // Reset error message
        setRating(0); // Clear rating
        setFeedback(''); // Clear feedback text
      } else {
        // Handle error
        console.error('Error submitting feedback:', responseData);
        setError(responseData.message || 'Error submitting feedback. Please try again.');
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      console.error('Error submitting feedback:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      // Set loading to false when the request is complete
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      {isSubmitted ? (
        <FeedbackSubmit />
      ) : (
        <>
          <h2>We value your opinion.</h2>
          <p>How would you rate your overall experience?</p>
          <div className="feedback-stars" role="radiogroup" aria-labelledby="rating">
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={index < rating ? 'filledStar' : 'emptyStar'}
                onClick={() => handleStarClick(index)}
                role="radio"
                aria-checked={index < rating ? 'true' : 'false'}
                aria-label={`Star ${index + 1}`}
              >
                ★
              </span>
            ))}
          </div>
          <p>Kindly take a moment to tell us what you think.</p>
          <textarea
            className="feedback-textarea"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Your feedback here..."
            required
          />
          <button
            className="feedback-button"
            onClick={handleSubmit}
            disabled={loading} // Disable button while submitting
          >
            {loading ? 'Submitting...' : 'Share my feedback'}
          </button>
          {error && <p className="error-message">{error}</p>} {/* Show error message if validation fails */}
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
