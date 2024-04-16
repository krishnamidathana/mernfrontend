import React from "react";
import "./CustomerDetails.css";
import { useSelector } from "react-redux"; // Import useSelector hook from React Redux for accessing Redux store

// CustomerDetails component
const CustomerDetails = () => {
  // Access userDetails from Redux store
  const userDetails = useSelector((state) => state.userDetails);
  return (
    <div className="customer-details-container">
      {/* Heading for customer details */}
      <h2 className="customer-details-heading">Customer Details</h2>

      {/* Top line containing pairs of information */}
      <div className="topLine">
        <div className="pairs">
          <p>First Name</p>
          <p>{userDetails.fname}</p>
        </div>
        <div className="pairs">
          <p>Last Name</p>
          <p>{userDetails.lname}</p>
        </div>
        <div className="pairs">
          <p>Email</p>
          <p>{userDetails.email}</p>
        </div>
      </div>

      {/* Bottom line containing pairs of information */}
      <div className="bottomLine">
        <div className="pairs">
          <p>Primary Number</p>
          <p>{userDetails.mobileNumber}</p>
        </div>
        <div className="pairs">
          <p>Alternate Number</p>
          <p>{userDetails.altMobileNumber}</p>
        </div>
        <div className="pairs">
          <button className="password-button">Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
