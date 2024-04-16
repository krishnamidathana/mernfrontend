import React from "react"; // Import React library
import "./Alert.css"; // Import CSS file for styling

// Alert component
const Alert = ({ onClose, children }) => {
  // Div container for the alert with onClick event handler to close the alert
  return (
    <div className="alert" onClick={onClose}>
      {children}
    </div>
  );
};

export default Alert; // Export Alert component
