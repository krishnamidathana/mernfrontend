import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook from React Router DOM
import { FaLongArrowAltRight } from "react-icons/fa"; // Import Long Arrow Alt Right icon from React Icons
import "./NavigationPath.css"; // Import CSS file for styling

// NavigationPath component
const NavigationPath = () => {
  const location = useLocation(); // Get the current location from useLocation hook

  let navigationPath = ""; // Variable to hold the navigation path JSX

  // Switch statement to determine the navigation path based on the current location
  switch (true) {
    // If the current path is the root path
    case location.pathname === "/":
      navigationPath = (
        <div className="path-line">
          Customer
          <div className="actives">
            {" "}
            <FaLongArrowAltRight />
            View All Customers{" "}
          </div>
        </div>
      );
      break;
    // If the current path is the "/add" path
    case location.pathname === "/add":
      navigationPath = (
        <div className="path-line">
          Customer{" "}
          <div className="actives">
            <FaLongArrowAltRight /> Add User
          </div>
        </div>
      );
      break;
    // If the current path contains "/update/"
    case location.pathname.indexOf("/update/") === 0:
      navigationPath = (
        <div className="path-line">
          Customer <FaLongArrowAltRight /> View All Customers{" "}
          <div className="actives">
            <FaLongArrowAltRight /> Update User
          </div>
        </div>
      );
      break;
    // If the current path is "/customerdetails"
    case location.pathname === "/customerdetails":
      navigationPath = (
        <div className="path-line">
          Customer <FaLongArrowAltRight /> View All Customers{" "}
          <div className="actives">
            <FaLongArrowAltRight /> Customer Details
          </div>
        </div>
      );
      break;
    // Default case for unknown routes
    default:
      navigationPath = (
        <div className="path-line">
          Customer
          <div className="actives">
            {" "}
            <FaLongArrowAltRight />
            View All Customers{" "}
          </div>
        </div>
      );
  }

  return (
    <div>
      <span>{navigationPath}</span>
    </div>
  );
};

export default NavigationPath;
