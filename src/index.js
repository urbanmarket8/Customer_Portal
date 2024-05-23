import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./../node_modules/jquery/dist/jquery.js";
import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "./toaster";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      autoClose={7e3}
      bodyClassName="text-break"
      containerId="toast-container"
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
