import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";
import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

const AuthPage = ({ page }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    personalNumber: "",
    birthdate: "",
    socialMediaProfileLink: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (page === "register") {
        const response = await axios.post(
          `${apiUrl}/api/users/register`,
          form,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Registration Successful:", response.data);
        alert("Registration Successful");
        navigate("/login");
      } else if (page === "login") {
        const response = await axios.post(
          `${apiUrl}/api/auth/login`,
          {
            email: form.email,
            password: form.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        
        alert("Login Successful");
        window.location.replace("/#/Profile");
      } else if (page === "forgot-password") {
        const { email } = form;
        const response = await axios.post(
          `${apiUrl}/api/auth/forgot-password`,
          { email },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Reset Email Sent:", response.data);
        alert("Password reset link sent to your email.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const renderLogin = () => (
    <>
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="user@example.com"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="••••••••"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth-button">Sign in</button>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="auth-link">
          Forgot your password? <Link to="/forgot-password">Reset here</Link>
        </p>
      </form>
    </>
  );

  const renderRegister = () => (
    <>
      <h1 className="auth-title">Register</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "phoneNumber", label: "Phone Number" },
          { name: "personalNumber", label: "Personal Number" },
          { name: "birthdate", label: "Birthdate", type: "date" },
          {
            name: "socialMediaProfileLink",
            label: "Social Media Profile Link",
          },
          { name: "country", label: "Country" },
        ].map(({ name, label, type = "text" }) => (
          <div className="form-group" key={name}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              id={name}
              className="form-input"
              placeholder={label}
              required
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="auth-button">Register</button>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </>
  );

  const renderForgotPassword = () => (
    <>
      <h1 className="auth-title">Forgot Password</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="user@example.com"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth-button">Reset Password</button>
        <p className="auth-link">
          Remembered? <Link to="/login">Login here</Link>
        </p>
      </form>
    </>
  );

  return (
    <section className="auth-container">
      <div className="auth-box">
        {page === "login" && renderLogin()}
        {page === "register" && renderRegister()}
        {page === "forgot-password" && renderForgotPassword()}
      </div>
    </section>
  );
};

export default AuthPage;
