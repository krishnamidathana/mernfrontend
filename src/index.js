import React from 'react';
import ReactDOM from "react-dom/client"; // Importing ReactDOM's createRoot method
import "./index.css";
import App from "./App"; // Importing the main App component
import { createStore } from "redux"; // Importing createStore from Redux for creating the store
import { Provider } from "react-redux"; // Importing Provider from React Redux for providing the Redux store to the component tree
import rootReducer from "./reducers"; // Importing the root reducer

// Create the Redux store using the root reducer
const store = createStore(rootReducer);

// Create a root for ReactDOM to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the application within StrictMode to catch potential issues
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


