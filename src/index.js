import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { initializeApp } from "firebase/app";
import { Helmet } from "react-helmet";

const firebaseConfig = {
  apiKey: "AIzaSyCGWltWiZHqyP9ygeI6zqDYHUKivGBleAk",
  authDomain: "construction-website-91dac.firebaseapp.com",
  projectId: "construction-website-91dac",
  storageBucket: "construction-website-91dac.appspot.com",
  messagingSenderId: "871639470267",
  appId: "1:871639470267:web:332fcc0e84d52c810d599e",
  measurementId: "G-610TCNT5VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Helmet>
        <title>Koko JCB Rental - Professional Services</title>
        <meta name="description" content="Professional JCB backhoe rental services" />
      </Helmet>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
