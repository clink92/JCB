import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import emailjs from 'emailjs-com';

emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router
      unstable_futuristics={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <App />
    </Router>
  </React.StrictMode>,
);
