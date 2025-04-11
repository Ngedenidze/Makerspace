import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/sections/authPage/utils/AuthProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { CartProvider } from "./components/reusable/Cart/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
    <I18nextProvider i18n={i18n}>

    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
    </I18nextProvider>
    </CartProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
