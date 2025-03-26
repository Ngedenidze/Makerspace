import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";
import api from "./utils/AxiosInstance";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

const getFriendlyErrorMessage = (status, defaultMessage) => {
  switch (status) {
    case 400:
      return "Bad Request. Please check your input.";
    case 401:
      return "Invalid credentials. Please try again.";
    case 403:
      return "You don’t have permission to perform this action.";
    case 404:
      return "Resource not found.";
    case 500:
      return "Server error. Please try again later.";
    case 0:
      return "Network error. Please check your internet connection.";
    default:
      return defaultMessage || "Something went wrong. Please try again.";
  }
};

const AuthPage = ({ page }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    personalNumber: "",
    birthdate: "",
    socialMediaProfileLink: "",
    country: "",
  });

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.data) {
          setCountries(data.data);
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    setErrors({});
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form on submit
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
      if (!form.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
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
        newErrors.socialMediaProfileLink =
          "Social Media Profile Link is required.";
      }
      if (!form.country.trim()) {
        newErrors.country = "Country is required.";
      }

      // Password rules check
      if (
        !form.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/
        )
      ) {
        newErrors.password =
          "Password must be at least 8 characters long, with uppercase, lowercase, and a special character.";
      }
      // Social media link must be Instagram or Facebook
      if (
        !form.socialMediaProfileLink.match(
          /^(https?:\/\/)?(www\.)?(facebook\.com|instagram\.com)\/[A-Za-z0-9_.-]+\/?$/
        )
      ) {
        newErrors.socialMediaProfileLink =
          "Only Facebook or Instagram profile links are allowed.";
      }
      const birthdate = new Date(form.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.birthdate = "You must be at least 18 years old.";
      }
      if (!/^\d{11}$/.test(form.personalNumber)) {
        newErrors.personalNumber = "Personal Number must be exactly 11 digits.";
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

    // Run validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let response;
      if (page === "register") {
        response = await api.post("/auth/register", form);
        console.log("Registration Successful:", response.data);
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (page === "login") {
        response = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        const { accessToken: token } = response.data;
        console.log("Login Successful:", token);
        localStorage.setItem("accessToken", token);
        navigate("/profile");
        window.location.reload();
      } else if (page === "forgot-password") {
        response = await api.post("/auth/request-password-reset", {
          email: form.email,
        });
        console.log("Reset Email Sent:", response.data);
      }
    } catch (error) {
      const status = error.response?.status || 0;
      const friendlyMessage = getFriendlyErrorMessage(
        status,
        error.response?.data?.message
      );
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: friendlyMessage });
      }
    }
  };

  // Live password rule validations
  const passwordRules = [
    {
      label: "At least 8 characters",
      isValid: form.password.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      isValid: /[A-Z]/.test(form.password),
    },
    {
      label: "At least one lowercase letter",
      isValid: /[a-z]/.test(form.password),
    },
    {
      label: "At least one special character",
      isValid: /[^A-Za-z0-9]/.test(form.password),
    },
  ];

  const renderLogin = () => (
    <>
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
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
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="auth-button">
          Sign in
        </button>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="auth-link">
          Forgot your password?{" "}
          <Link to="/forgot-password">Reset here</Link>
        </p>
      </form>
    </>
  );

  const renderRegister = () => {
    const fields = [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      // We'll add confirmPassword field next
      { name: "confirmPassword", label: "Re-enter Password", type: "password" },
      { name: "personalNumber", label: "Personal Number" },
      { name: "birthdate", label: "Birthdate", type: "date" },
      {
        name: "socialMediaProfileLink",
        label: "Social Media Profile Link",
      },
    ];

    return (
      <>
        <h1 className="auth-title">Register</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {success && (
            <div
              className="success-text"
              style={{ color: "green", marginBottom: "1rem" }}
            >
              {success}
            </div>
          )}
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
                onChange={(e) => {
                  handleChange(e);
                  if (name === "password" && !passwordTouched) {
                    setPasswordTouched(true);
                  }
                  if (name === "confirmPassword" && !confirmPasswordTouched) {
                    setConfirmPasswordTouched(true);
                  }
                }}
                value={form[name]}
              />
              {errors[name] && <div className="error-text">{errors[name]}</div>}
              {/* Live password rules below the password field (only if touched) */}
              {name === "password" && passwordTouched && (
                <div className="password-rules">
                  {passwordRules.map((rule, index) => (
                    <p
                      key={index}
                      style={{
                        color: rule.isValid ? "green" : "red",
                        margin: "0.2rem 0",
                        fontSize: "0.9rem",
                      }}
                    >
                      {rule.label}
                    </p>
                  ))}
                </div>
              )}
              {/* Live check for password match below the confirmPassword field (only if touched) */}
              {name === "confirmPassword" && confirmPasswordTouched && (
                <div
                  className="password-match"
                  style={{
                    color:
                      form.password === form.confirmPassword ? "green" : "red",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {form.password === form.confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </div>
              )}
            </div>
          ))}
          {/* ...rest of your form fields (country, phone number, etc.) */}
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              name="country"
              id="country"
              className="form-input"
              onChange={handleChange}
              value={form.country}
            >
              <option value="">Select a country</option>
              {countries.map((c, index) => (
                <option key={index} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <div className="error-text">{errors.country}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                name="countryCode"
                className="form-input"
                style={{ width: "30%" }}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    phoneNumber: `${e.target.value}${prev.phoneNumber.replace(
                      /^\+\d+/,
                      ""
                    )}`,
                  }))
                }
              >
                <option value="">Select code</option>
                {countries.map((c, index) => (
                  <option key={index} value={c.dial_code}>
                    {c.name} ({c.dial_code})
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="form-input"
                style={{ width: "70%" }}
                placeholder="5XXXXXXXX"
                onChange={handleChange}
                value={form.phoneNumber}
              />
            </div>
            {errors.phoneNumber && (
              <div className="error-text">{errors.phoneNumber}</div>
            )}
          </div>
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
