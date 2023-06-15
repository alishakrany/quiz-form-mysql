import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './Helpers/registerServiceWorker';
import { Provider } from "react-redux";
import store from "./Helpers/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();