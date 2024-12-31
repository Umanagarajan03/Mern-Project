import React from "react";
import "./Privacy_Terms.css";

const TermsOfUse = () => {
  return (
    <div className="privacy-terms-container">
      <h2>QualiDash terms of use</h2>
      <div className="terms-gradient-line"></div>
      <p>Welcome to the QualiDash. By accessing or using the Dashboard, you agree to the following terms of use:</p>
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing the Dashboard, you acknowledge that you have read, understood, and agreed to these terms. If you do not agree, please refrain from using the Dashboard.</p>
      <h3>2. Intended Use</h3>
      <p>The Dashboard is designed to assist manufacturers in monitoring and analyzing product quality. It should be used for informational purposes only and does not replace professional advice or decision-making in manufacturing processes.</p>
      <h3>3. User Responsibilities</h3>
      <ul>
        <li>Ensure that the data provided to the Dashboard is accurate and complete.</li>
        <li>Use the Dashboard in compliance with applicable laws and regulations.</li>
        <li>Maintain the confidentiality of your account credentials and restrict unauthorized access.</li>
      </ul>
      <h3>4. Data Privacy</h3>
      <p>The Dashboard may collect and store data provided by users for quality control purposes. We prioritize your privacy and comply with relevant data protection laws. Please refer to our Privacy Policy for details.</p>
      <h3>5. Limitations of Liability</h3>
      <p>The Dashboard is provided on an "as-is" basis. While we strive for accuracy, we do not guarantee the correctness or completeness of the analysis or reports. We are not liable for any losses resulting from the use of the Dashboard.</p>
      <h3>6. Prohibited Activities</h3>
      <ul>
        <li>Attempt to reverse-engineer or tamper with the Dashboard.</li>
        <li>Introduce malicious software, such as viruses or trojans.</li>
        <li>Use the Dashboard for unlawful purposes.</li>
      </ul>
      <h3>7. Termination</h3>
      <p>We reserve the right to suspend or terminate access to the Dashboard at our discretion, without notice, if there is a violation of these terms.</p>
      <h3>8. Modifications</h3>
      <p>We may revise these terms periodically. Continued use of the Dashboard after updates indicates your acceptance of the revised terms.</p>
      <h3>9. Contact Information</h3>
      <p>For questions or concerns about these terms, please contact us at <a href= "mailto:contactqualidash@gmail.com" className="no-underline darkblue-link">Qualidash</a>.</p>
    </div>
  );
};

export default TermsOfUse;