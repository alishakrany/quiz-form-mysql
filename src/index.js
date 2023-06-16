import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import registerServiceWorker from "./Helpers/registerServiceWorker";
import { Provider } from "react-redux";
import store from "./Helpers/store";

const rootElement = document.getElementById("root");

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the service worker
registerServiceWorker();
