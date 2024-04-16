// Retrieve stored user details from local storage, parse them as JSON, or default to null if not present
export const storedUserDetails = JSON.parse(
  localStorage.getItem("userDetails")
);

// Initial state of the Redux store
const initialState = {
  // Default active page is the root "/"
  activePage: "/",
  // Default page title is "View All Customers"
  pageTitle: "View All Customers",
  // User details fetched from local storage or null if not present
  userDetails: storedUserDetails || null,
  // Array to hold user data
  users: [],
  // Form state with initial values
  form: {
    fname: "",
    lname: "",
    countryCode1: "+91",
    mobileNumber: "",
    countryCode2: "+91",
    altMobileNumber: "",
    email: "",
  },
};

// Root reducer function to manage state changes
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action type to set the active page
    case "SET_ACTIVE_PAGE":
      return {
        ...state,
        activePage: action.payload,
      };
    // Action type to set the page title
    case "SET_PAGE_TITLE":
      return {
        ...state,
        pageTitle: action.payload,
      };
    // Action type to set user details
    case "SET_USER_DETAILS":
      return {
        userDetails: action.payload,
      };
    // Default case, return the current state
    default:
      return state;
  }
};
// Export the root reducer
export default rootReducer;
