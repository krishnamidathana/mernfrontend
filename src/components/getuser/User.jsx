import React, { useEffect, useState } from "react"; // Import React library and necessary hooks
import "./User.css"; // Import CSS file for styling
import { BASE_URL } from "../../helper";

import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import { MdDeleteOutline } from "react-icons/md"; // Import Delete icon from React Icons
import { GrView } from "react-icons/gr"; // Import View icon from React Icons
import { MdModeEditOutline } from "react-icons/md"; // Import Edit icon from React Icons
import { IoMdSearch } from "react-icons/io"; // Import Search icon from React Icons
import { CiFilter } from "react-icons/ci"; // Import Filter icon from React Icons
import axios from "axios"; // Import axios for making HTTP requests
import { setUserDetails } from "../../actions"; // Import setUserDetails action creator
import { useDispatch } from "react-redux"; // Import useDispatch hook from React Redux for dispatching actions
import Alert from "../alert/Alert"; // Import Alert component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router DOM for navigation

// User component
const User = () => {
  const [loading, setLoading] = useState(true); // State variable for loading indicator
  const [users, setUsers] = useState([]); // State variable for storing all users
  const [filteredUsers, setFilteredUsers] = useState([]); // State variable for storing filtered users
  const [selectedDate, setSelectedDate] = useState(null); // State variable for storing selected date

  const [showAlert, setShowAlert] = useState(false); // State variable for controlling alert visibility
  const [searchName, setSearchName] = useState(""); // State variable for storing search by name input value
  const [searchMobile, setSearchMobile] = useState(""); // State variable for storing search by mobile number input value
  const [searchEmail, setSearchEmail] = useState(""); // State variable for storing search by email input value

  // Redux dispatcher
  const dispatch = useDispatch();

  // React Router DOM navigate hook
  const navigate = useNavigate();

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getall`); // Fetch users data from API
        setUsers(response.data.userData); // Set users state variable with fetched data
        setFilteredUsers(response.data.userData); // Set filteredUsers state variable with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only on component mount

  // if (loading) {
  //   return <div>Loading...</div>; // Render loading indicator while data is being fetched
  // }

  // Function to delete a user
  const deleteUser = async (userId) => {
    await axios
      .delete(`${BASE_URL}/api/delete/${userId}`) // Delete user from API
      .then(() => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId)); // Update users state variable by filtering out deleted user
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        ); // Update filteredUsers state variable by filtering out deleted user
        setShowAlert(true); // Show alert for successful deletion
        setTimeout(() => {
          setShowAlert(false);
        }, 1000); // Hide alert after 1 second
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to handle viewing user details
  const handleViewUser = (user) => {
    dispatch(setUserDetails(user)); // Dispatch action to set user details in Redux store
    navigate("/customerdetails"); // Navigate to customer details page
  };

  // Function to handle editing user
  const handleEdit = (userId) => {
    navigate(`/update/` + userId); // Navigate to update user page
  };

  // Function to format date string
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString); // Create date object from date string
    const day = String(date.getDate()).padStart(2, "0"); // Get day with padding
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month with padding
    const year = date.getFullYear(); // Get full year
    return `${day}-${month}-${year}`; // Return formatted date string
  };

  // Function to handle search
  const handleSearch = () => {
    let filtered = users.filter(
      (user) =>
        (user.fname.toLowerCase() + " " + user.lname.toLowerCase()).includes(
          searchName.toLowerCase()
        ) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        ((user.countryCode1 + "-" + String(user.mobileNumber)).includes(
          searchMobile
        ) ||
          (user.countryCode2 + "-" + String(user.altMobileNumber)).includes(
            searchMobile
          ))
    ); // Filter users based on search criteria

    setFilteredUsers(filtered); // Update filteredUsers state variable with filtered data

    setSearchName(""); // Clear search by name input
    setSearchMobile(""); // Clear search by mobile number input
    setSearchEmail(""); // Clear search by email input
  };

  // Function to handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date); // Update selectedDate state variable
    const formattedDate = formatDate(date); // Format selected date
    const filtered = users.filter(
      (user) => formatDate(user.createdAt) === formattedDate
    ); // Filter users based on selected date
    setFilteredUsers(filtered); // Update filteredUsers state variable with filtered data
  };

  return (
    <div>
      {/* Filter options section */}
      <div className="filter-options">
        <button className="filter-button">
          Filter <CiFilter />
        </button>
        {/* Search by name input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <IoMdSearch className="search-icon" onClick={handleSearch} />
        </div>
        {/* Search by mobile number input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Mobile "
            value={searchMobile}
            onChange={(e) => setSearchMobile(e.target.value)}
          />
          <IoMdSearch className="search-icon" onClick={handleSearch} />
        </div>
        {/* Search by email input */}
        <div className="search-container">
          <input
            type="email"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <IoMdSearch className="search-icon" onClick={handleSearch} />
        </div>
        {/* Date picker for selecting a date */}
        <div className="search-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelection}
            placeholderText="Select a Date"
            dateFormat="yyyy-MM-dd"
            cursor={PointerEvent}
          />
        </div>
      </div>
      {/* User table container */}
      <div className="user-table-container">
        <div className="table-responsive">
          {/* User table */}
          <table className="user-table">
            {/* Table header */}
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Contact Number</th>
                <th>Alternate Number</th>
                <th>Email</th>
                <th>Registered On</th>
                <th>Status</th>
                <th>Booking History</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Mapping through filteredUsers array to render table rows */}
              {filteredUsers.map((user, index) => {
                return (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {user.fname} {user.lname}
                    </td>
                    <td>
                      {user.countryCode1}-{user.mobileNumber}
                    </td>
                    <td>
                      {user.countryCode2}-{user.altMobileNumber}
                    </td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.createdAt)}</td>

                    <td>Active</td>
                    <td>
                      <button className="show-button">Show</button>
                    </td>
                    {/* Delete user button */}
                    <td className="actions">
                      <MdDeleteOutline
                        onClick={() => deleteUser(user._id)}
                        style={{ cursor: "pointer" }}
                      />
                      {/* View user details button */}
                      <GrView onClick={() => handleViewUser(user)} />
                      {/* Edit user button */}
                      <MdModeEditOutline onClick={() => handleEdit(user._id)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Alert for successful user deletion */}
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)}>
            <p>User Deleted successfully!</p>
          </Alert>
        )}
        {loading && (
          <Alert onClose={() => setLoading(false)}>
            <p>Loading....</p>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default User;
