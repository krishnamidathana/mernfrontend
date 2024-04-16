import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar"; // Importing Navbar component
import User from "./components/getuser/User"; // Importing User component for viewing all customers
import AddUser from "./components/addUser/AddUser"; // Importing AddUser component for adding a new user
import UpdateUser from "./components/updateUser/UpdateUser"; // Importing UpdateUser component for updating user details
import CustomerDetails from "./components/customerDetails/CustomerDetails"; // Importing CustomerDetails component for viewing customer details

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/" element={<User />} />
          <Route path="/add" element={<AddUser />} />{" "}
          <Route path="/update/:id" element={<UpdateUser />} />{" "}
          <Route path="/customerdetails/" element={<CustomerDetails />} />{" "}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
