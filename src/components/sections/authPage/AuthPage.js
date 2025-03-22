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

  // We'll store any validation or server errors in this state
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simple helper to do minimal "required" checks
  // and gather errors in an object
  const validateForm = () => {
    const newErrors = {};

    if (page === "login") {
      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      }
      if (!form.password.trim()) {
        newErrors.password = "Password is required.";
      }
    } else if (page === "register") {
      if (!form.firstName.trim()) {
        newErrors.firstName = "First Name is required.";
      }
      if (!form.lastName.trim()) {
        newErrors.lastName = "Last Name is required.";
      }
      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      }
      if (!form.password.trim()) {
        newErrors.password = "Password is required.";
      }
      if (!form.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone Number is required.";
      }
      if (!form.personalNumber.trim()) {
        newErrors.personalNumber = "Personal Number is required.";
      }
      if (!form.birthdate) {
        newErrors.birthdate = "Birthdate is required.";
      }
      if (!form.socialMediaProfileLink.trim()) {
        newErrors.socialMediaProfileLink = "Social Media Profile Link is required.";
      }
      if (!form.country.trim()) {
        newErrors.country = "Country is required.";
      }
    } else if (page === "forgot-password") {
      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Run client-side validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop here if we have local validation errors
    }

    // 2) If no local errors, attempt server request
    try {
      let response;
      if (page === "register") {
        response = await axios.post(`${apiUrl}/api/users/register`, form, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Registration Successful:", response.data);
        // Optionally show a success message
        // or navigate right away
        navigate("/login");
      } else if (page === "login") {
        response = await axios.post(
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

        window.location.replace("/#/Profile");
        window.location.reload();
      } else if (page === "forgot-password") {
        response =await axios.post(
          `${apiUrl}/api/users/request-password-reset`,
          JSON.stringify(form.email),       // <--- Just the raw email string in JSON
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        
        console.log("Reset Email Sent:", response.data);
        // Optionally show a success message
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      // 3) Check if server returned structured validation errors
      //    e.g. { errors: { email: "Invalid email", password: "Too short" } }
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        // Otherwise, set a general error
        // e.g. { general: "Invalid credentials" }
        setErrors({
          general: error.response?.data?.message || error.message,
        });
      }
    }
  };

  // RENDER FUNCTIONS
  const renderLogin = () => (
    <>
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* GENERAL ERROR (if any) */}
        {errors.general && <div className="error-text">{errors.general}</div>}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="user@example.com"
            onChange={handleChange}
          />
          {/* Field-specific error */}
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="••••••••"
            onChange={handleChange}
          />
          {/* Field-specific error */}
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <button type="submit" className="auth-button">
          Sign in
        </button>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="auth-link">
          Forgot your password? <Link to="/forgot-password">Reset here</Link>
        </p>
      </form>
    </>
  );

  const renderRegister = () => {
    // A small config array for the fields
    const fields = [
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
    ];

    return (
      <>
        <h1 className="auth-title">Register</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* GENERAL ERROR (if any) */}
          {errors.general && <div className="error-text">{errors.general}</div>}

          {fields.map(({ name, label, type = "text" }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                className="form-input"
                placeholder={label}
                onChange={handleChange}
              />
              {/* Field-specific error */}
              {errors[name] && <div className="error-text">{errors[name]}</div>}
            </div>
          ))}
          <button type="submit" className="auth-button">
            Register
          </button>
          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </>
    );
  };

  const renderForgotPassword = () => (
    <>
      <h1 className="auth-title">Forgot Password</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* GENERAL ERROR (if any) */}
        {errors.general && <div className="error-text">{errors.general}</div>}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="user@example.com"
            onChange={handleChange}
          />
          {/* Field-specific error */}
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <button type="submit" className="auth-button">
          Reset Password
        </button>
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
