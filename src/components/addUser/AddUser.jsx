import React, { useState } from "react"; // Importing React and useState hook
import "./AddUser.css"; // Importing CSS file for styling
import { connect } from "react-redux"; // Importing connect function from React Redux for connecting component to Redux store
import { resetForm } from "../../actions"; // Importing action creator to reset form state
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router for navigation
import axios from "axios"; // Importing axios for making HTTP requests
import Alert from "../alert/Alert"; // Importing Alert component for displaying success message
import { BASE_URL } from "../../helper";

// AddUser component
const AddUser = ({ resetForm, form }) => {
  const navigate = useNavigate(); // Initializing navigate function for navigation

  // State variables
  const [user, setUser] = useState(form); // State for user input data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [showAlert, setShowAlert] = useState(false); // State for showing success alert
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for disabling submit button

  // Handler function for input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handler function for form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    const isEmptyField = Object.values(user).some((value) => value === "");

    // If any field is empty, show alert and return
    if (isEmptyField) {
      alert("Please fill in all fields");
      return;
    }

    // Start loading
    setLoading(true);
    setIsButtonDisabled(true);
    // Send POST request to create user
    await axios
      .post(`${BASE_URL}/api/create`, user)
      .then(() => {
        // Show success alert
        setShowAlert(true);
        // Navigate to home page after a delay
        setTimeout(() => {
          setShowAlert(false);
          navigate("/");
        }, 1500);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        // Reset form state
        resetForm();
        // Stop loading
        setLoading(false);
      });
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Add User</h2>
      <form onSubmit={submitHandler}>
        <div className="input-group">
          {/* Input fields */}
          {/* First Name and Last Name */}
          <div className="input-row">
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Type First Name"
                onChange={inputHandler}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Type Last Name"
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          {/* Mobile Number and Alternate Number */}
          <div className="input-row">
            <div className="input-field">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <div className="select-container">
                {/* Country code selection */}

                <select
                  id="countryCode1"
                  name="countryCode1"
                  onChange={inputHandler}
                  value={null}
                  required={true}
                >
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+61">AS (+61)</option>
                  <option value="+81">JS (+81)</option>
                </select>
              </div>
              {/* Mobile number input */}
              <input
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Type Mobile Number"
                onChange={inputHandler}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="alternateMobile">Alternate Number</label>
              <div className="select-container">
                {/* Country code selection */}
                <select
                  id="countryCode2"
                  name="countryCode2"
                  onChange={inputHandler}
                  value={null}
                  required={true}
                >
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+61">AS (+61)</option>
                  <option value="+81">JS (+81)</option>
                </select>
              </div>

              {/* Alternate mobile number input */}
              <input
                type="number"
                id="altMobileNumber"
                name="altMobileNumber"
                placeholder="Alternate Mobile Number"
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="input-row">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type Email Address"
                onChange={inputHandler}
                required
              />
            </div>
          </div>
          {/* Submit button */}
          <button
            className={`add-user-button ${
              loading || isButtonDisabled ? "loading" : ""
            }`}
            type="submit"
            disabled={isButtonDisabled}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)}>
          <p>User Added successfully!</p>
          <p style={{ color: "black" }}>Mail sent to registered Email Id!</p>
        </Alert>
      )}
    </div>
  );
};

// Map state to props function to access form state from Redux store
const mapStateToProps = (state) => ({
  form: state.form,
});
// Connect AddUser component to Redux store and provide action creator to reset form state
export default connect(mapStateToProps, { resetForm })(AddUser);
