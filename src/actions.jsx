// Action creator to set the active page
export const setActivePage = (page) => ({
  type: "SET_ACTIVE_PAGE", // Action type indicating setting the active page
  payload: page, // Payload containing the active page information
});

// Action creator to set the page title
export const setPageTitle = (title) => ({
  type: "SET_PAGE_TITLE", // Action type indicating setting the page title
  payload: title, // Payload containing the page title
});

// Action creator to reset the form
export const resetForm = () => {
  return {
    type: "RESET_FORM", // Action type indicating resetting the form
  };
};

// Action creator to set user details and save them to localStorage
export const setUserDetails = (userDetails) => {
  // Save user details to localStorage
  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  return {
    type: "SET_USER_DETAILS", // Action type indicating setting user details
    payload: userDetails, // Payload containing the user details
  };
};
