import React, { useEffect, useState } from "react"; // Import React library and useEffect hook
import "../addUser/AddUser.css"; // Import CSS file for styling
import { connect } from "react-redux"; // Import connect function from React Redux
import { resetForm } from "../../actions"; // Import resetForm action creator
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams hooks from React Router DOM
import axios from "axios"; // Import axios for making HTTP requests
import Alert from "../alert/Alert"; // Import Alert component
import { storedUserDetails } from "../../reducers"; // Import storedUserDetails reducer
import { BASE_URL } from "../../helper";

// UpdateUser component
const UpdateUser = ({ resetForm, form, userDetails }) => {
  const navigate = useNavigate(); // React Router DOM navigate hook

  const { id } = useParams(); // Get the id parameter from the URL
  const [user, setUser] = useState(storedUserDetails); // State variable for storing user data
  const [loading, setLoading] = useState(false); // State variable for loading status

  const [showAlert, setShowAlert] = useState(false); // State variable for controlling alert visibility

  // useEffect hook to fetch user data on component mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/getone/${id}`)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Function to handle input change
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true during form submission
    await axios
      .put(`${BASE_URL}/api/update/${id}`, user) // Update user data using PUT request to API
      .then(() => {
        setShowAlert(true); // Show success alert
        setTimeout(() => {
          setShowAlert(false);
          navigate("/"); // Redirect to home page after updating user
        }, 1000);
      })
      .catch((error) => console.log(error));
    resetForm(); // Reset form state
    setLoading(false); // Set loading to false after form submission
  };
  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Update User</h2>
      <form onSubmit={submitHandler}>
        {/* Input fields for updating user information */}
        <div className="input-group">
          <div className="input-row">
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Type First Name"
                value={user.fname}
                onChange={inputChangeHandler}
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
                value={user.lname}
                onChange={inputChangeHandler}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-field">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <div className="select-container">
                <select
                  id="countryCode1"
                  name="countryCode1"
                  onChange={inputChangeHandler}
                  value={user.countryCode1}
                  required={true}
                >
                  {/* Options for selecting country code */}
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+61">AS (+61)</option>
                  <option value="+81">JS (+81)</option>
                </select>
              </div>
              <input
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                value={user.mobileNumber}
                placeholder="Type Mobile Number"
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="alternateMobile">Alternate Number</label>
              <div className="select-container">
                <select
                  id="countryCode2"
                  name="countryCode2"
                  value={user.countryCode2}
                  onChange={inputChangeHandler}
                  required={true}
                >
                  {/* Options for selecting country code */}
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+61">AS (+61)</option>
                  <option value="+81">JS (+81)</option>
                </select>
              </div>
              <input
                type="number"
                id="altMobileNumber"
                name="altMobileNumber"
                value={user.altMobileNumber}
                placeholder="Alternate Mobile Number"
                onChange={inputChangeHandler}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                placeholder="Type Email Address"
                onChange={inputChangeHandler}
                required
              />
            </div>
          </div>
          <button className="add-user-button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
      {/* Alert for showing update success */}
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)}>
          <p>User Updated successfully!</p>
        </Alert>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
});

export default connect(mapStateToProps, { resetForm })(UpdateUser);
