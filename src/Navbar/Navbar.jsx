import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../actions"; // Importing action creator
import "./Navbar.css"; //  CSS file
import NavigationPath from "../components/navigationPath/NavigationPath";

const Navbar = () => {
  const dispatch = useDispatch(); // Redux dispatcher
  const location = useLocation(); /// useLocation hook to get the current location
  const [isLoading, setIsLoading] = useState(false); // State variable for loading state

  // Function to handle page change and dispatch setPageTitle action
  const handlePageChange = (title) => {
    dispatch(setPageTitle(title));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">
          <NavigationPath /> {/* Render NavigationPath component */}
        </h1>
        <ul className="navbar-nav">
          <li>
            <Link
              className={`nav-item ${
                location.pathname !== "/" || "/mernfrontend" ? "active" : ""
              }`}
              to="/"
              onClick={() => {
                setIsLoading(true);
                if (location.pathname === "/") {
                  window.location.reload(); // Reload the page if already on the homepage
                } else {
                  setIsLoading(false); // Set loading state to false
                }
              }}
            >
              {isLoading ? "Loading..." : "View All Customers"}
            </Link>
          </li>
          {location.pathname !== "/customerdetails" ? (
            <li>
              <Link
                className={`nav-item ${
                  location.pathname === "/add" ? "active" : ""
                }`}
                to="/add"
                onClick={() => handlePageChange("Add User")} // Call handlePageChange function with the specified title
              >
                Add User {/* Render Add User link */}
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
