import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";
import api from "./utils/AxiosInstance";
import { useTranslation } from "react-i18next";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://makerspace-cffwdbazgbh3ftdq.westeurope-01.azurewebsites.net"
    : "";

const getFriendlyErrorMessage = (status, defaultMessage, t) => {
  switch (status) {
    case 400:
      return t("error.bad_request", "Bad Request. Please check your input.");
    case 401:
      return t(
        "error.invalid_credentials",
        "Invalid credentials. Please try again."
      );
    case 403:
      return t(
        "error.no_permission",
        "You don’t have permission to perform this action."
      );
    case 404:
      return t("error.resource_not_found", "Resource not found.");
    case 500:
      return t("error.server_error", "Server error. Please try again later.");
    case 0:
      return t(
        "error.network_error",
        "Network error. Please check your internet connection."
      );
    default:
      return (
        defaultMessage ||
        t("error.generic", "Something went wrong. Please try again.")
      );
  }
};

const AuthPage = ({ page }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const { t } = useTranslation();
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
      .catch((error) => console.error(t("error.fetching_countries"), error));
  }, [t]);

  useEffect(() => {
    setErrors({});
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (page === "login") {
      if (!form.email.trim()) {
        newErrors.email = t("validation.email_required", "Email is required.");
      }
      if (!form.password.trim()) {
        newErrors.password = t(
          "validation.password_required",
          "Password is required."
        );
      }
    } else if (page === "register") {
      if (!form.firstName.trim()) {
        newErrors.firstName = t(
          "validation.first_name_required",
          "First Name is required."
        );
      }
      if (!form.lastName.trim()) {
        newErrors.lastName = t(
          "validation.last_name_required",
          "Last Name is required."
        );
      }
      if (!form.email.trim()) {
        newErrors.email = t("validation.email_required", "Email is required.");
      }
      if (!form.password.trim()) {
        newErrors.password = t(
          "validation.password_required",
          "Password is required."
        );
      }
      if (!form.confirmPassword.trim()) {
        newErrors.confirmPassword = t(
          "validation.confirm_password_required",
          "Please confirm your password."
        );
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = t(
          "validation.passwords_mismatch",
          "Passwords do not match."
        );
      }
      if (!form.phoneNumber.trim()) {
        newErrors.phoneNumber = t(
          "validation.phone_required",
          "Phone Number is required."
        );
      }
      if (!form.personalNumber.trim()) {
        newErrors.personalNumber = t(
          "validation.personal_number_required",
          "Personal Number is required."
        );
      }
      if (!form.birthdate) {
        newErrors.birthdate = t(
          "validation.birthdate_required",
          "Birthdate is required."
        );
      }
      if (!form.socialMediaProfileLink.trim()) {
        newErrors.socialMediaProfileLink = t(
          "validation.social_media_required",
          "Social Media Profile Link is required."
        );
      }
      if (!form.country.trim()) {
        newErrors.country = t(
          "validation.country_required",
          "Country is required."
        );
      }
      if (
        !form.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/
        )
      ) {
        newErrors.password = t(
          "validation.password_complexity",
          "Password must be at least 8 characters long, with uppercase, lowercase, and a special character."
        );
      }
      if (
        !form.socialMediaProfileLink.match(
          /^(https?:\/\/)?(www\.)?(facebook\.com|instagram\.com)\/[A-Za-z0-9_.-]+\/?$/
        )
      ) {
        newErrors.socialMediaProfileLink = t(
          "validation.social_media_format",
          "Only Facebook or Instagram profile links are allowed."
        );
      }
      const birthdate = new Date(form.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.birthdate = t(
          "validation.age_requirement",
          "You must be at least 18 years old."
        );
      }
      if (!/^\d{11}$/.test(form.personalNumber)) {
        newErrors.personalNumber = t(
          "validation.personal_number_format",
          "Personal Number must be exactly 11 digits."
        );
      }
    } else if (page === "forgot-password") {
      if (!form.email.trim()) {
        newErrors.email = t("validation.email_required", "Email is required.");
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
        setSuccess(
          t(
            "success.registration",
            "Registration successful! Redirecting to login..."
          )
        );
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

  const passwordRules = [
    {
      label: t("password_rules.length", "At least 8 characters"),
      isValid: form.password.length >= 8,
    },
    {
      label: t("password_rules.uppercase", "At least one uppercase letter"),
      isValid: /[A-Z]/.test(form.password),
    },
    {
      label: t("password_rules.lowercase", "At least one lowercase letter"),
      isValid: /[a-z]/.test(form.password),
    },
    {
      label: t("password_rules.special", "At least one special character"),
      isValid: /[^A-Za-z0-9]/.test(form.password),
    },
  ];

  const renderLogin = () => (
    <>
      <h1 className="auth-title">{t("auth.login_title", "Login")}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.general && <div className="error-text">{errors.general}</div>}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {t("auth.email_label", "Email")}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder={t("auth.email_placeholder", "user@example.com")}
            onChange={handleChange}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            {t("auth.password_label", "Password")}
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
          {t("auth.sign_in", "Sign in")}
        </button>
        <p className="auth-link">
          {t("auth.no_account", "Don't have an account?")}{" "}
          <Link to="/register">{t("auth.register_here", "Register here")}</Link>
        </p>
        <p className="auth-link">
          {t("auth.forgot_password", "Forgot your password?")}{" "}
          <Link to="/forgot-password">
            {t("auth.reset_here", "Reset here")}
          </Link>
        </p>
      </form>
    </>
  );

  const renderRegister = () => {
    const fields = [
      { name: "firstName", label: t("auth.first_name", "First Name") },
      { name: "lastName", label: t("auth.last_name", "Last Name") },
      { name: "email", label: t("auth.email_label", "Email"), type: "email" },
      {
        name: "password",
        label: t("auth.password_label", "Password"),
        type: "password",
      },
      {
        name: "confirmPassword",
        label: t("auth.confirm_password", "Re-enter Password"),
        type: "password",
      },
      {
        name: "personalNumber",
        label: t("auth.personal_number", "Personal Number"),
      },
      {
        name: "birthdate",
        label: t("auth.birthdate", "Birthdate"),
        type: "date",
      },
      {
        name: "socialMediaProfileLink",
        label: t("auth.social_media_link", "Social Media Profile Link"),
      },
    ];

    return (
      <>
        <h1 className="auth-title">{t("auth.register_title", "Register")}</h1>
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
                    ? t("auth.passwords_match", "Passwords match")
                    : t(
                        "auth.passwords_do_not_match",
                        "Passwords do not match"
                      )}
                </div>
              )}
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              {t("auth.country", "Country")}
            </label>
            <select
              name="country"
              id="country"
              className="form-input"
              onChange={handleChange}
              value={form.country}
            >
              <option value="">
                {t("auth.select_country", "Select a country")}
              </option>
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
              {t("auth.phone_number", "Phone Number")}
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
                <option value="">{t("auth.select_code", "Select code")}</option>
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
                placeholder={t("auth.phone_placeholder", "5XXXXXXXX")}
                onChange={handleChange}
                value={form.phoneNumber}
              />
            </div>
            {errors.phoneNumber && (
              <div className="error-text">{errors.phoneNumber}</div>
            )}
          </div>
          <button type="submit" className="auth-button">
            {t("auth.register", "Register")}
          </button>
          <p className="auth-link">
            {t("auth.already_have_account", "Already have an account?")}{" "}
            <Link to="/login">{t("auth.login_here", "Login here")}</Link>
          </p>
        </form>
      </>
    );
  };

  const renderForgotPassword = () => (
    <>
      <h1 className="auth-title">{t("auth.forgot_password", "Forgot Password")}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.general && <div className="error-text">{errors.general}</div>}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {t("auth.email_label", "Email")}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder={t("auth.email_placeholder", "user@example.com")}
            onChange={handleChange}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <button type="submit" className="auth-button">
          {t("auth.reset_password", "Reset Password")}
        </button>
        <p className="auth-link">
          {t("auth.remembered", "Remembered?")} <Link to="/login">{t("auth.login_here", "Login here")}</Link>
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
