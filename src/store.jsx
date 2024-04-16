// Importing createStore from Redux to create the Redux store

import { createStore } from "redux";
// Importing the root reducer from the reducers file
import rootReducer from "./reducers";
// Creating the Redux store using the root reducer
const store = createStore(rootReducer);
// Exporting the created Redux store to be used throughout the application
export default store;
