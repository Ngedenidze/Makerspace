import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AuthForm.css";
import api from "./utils/AxiosInstance";
import { useTranslation } from "react-i18next";
import { useAuth } from "./utils/AuthProvider";

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
  const location = useLocation();
  const { t } = useTranslation();
  const { saveToken } = useAuth();
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [georgiaSelected, setGeorgiaSelected] = useState(false);
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    socialMediaPlatform: "",
    socialMediaUsername: "",
    country: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Reset errors and submission state when page changes
  useEffect(() => {
    setIsSubmitting(false);
    setErrors({});
    setSuccess("");
  }, [page]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.data) {
          setCountries(data.data);
        }
      })
      .catch((error) =>
        console.error(t("error.fetching_countries", "Error fetching countries"), error)
      );
  }, [t]);

  // Field-level validation function: returns an error key (or null if valid)
  const validateField = (name, value) => {
    let errorKey = null;
    if (page === "login") {
      if (name === "email" && !value.trim()) {
        errorKey = "validation.email_required";
      }
      if (name === "password" && !value.trim()) {
        errorKey = "validation.password_required";
      }
    } else if (page === "register") {
      if (name === "firstName" && !value.trim()) {
        errorKey = "validation.first_name_required";
      }
      if (name === "lastName" && !value.trim()) {
        errorKey = "validation.last_name_required";
      }
      if (name === "email" && !value.trim()) {
        errorKey = "validation.email_required";
      }
      if (name === "password") {
        if (!value.trim()) {
          errorKey = "validation.password_required";
        } else if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/)) {
          errorKey = "validation.password_complexity";
        }
      }
      if (name === "confirmPassword") {
        if (!value.trim()) {
          errorKey = "validation.confirm_password_required";
        } else if (form.password && value !== form.password) {
          errorKey = "validation.password_mismatch";
        }
      }
      if (name === "phoneNumber" && !value.trim()) {
        errorKey = "validation.phone_required";
      }
      // Updated personalNumber validation:
      if (name === "personalNumber") {
        if (!value.trim()) {
          errorKey = "validation.personal_number_required";
        } else {
          if (form.country === "Georgia") {
            // For Georgia: require exactly 11 digits
            if (!/^\d{11}$/.test(value)) {
              errorKey = "validation.personal_number_format";
            }
          } else {
            // For other countries: require at least 8 digits
            if (!/^\d{8,}$/.test(value)) {
              errorKey = "validation.personal_number_format_non_georgia";
            }
          }
        }
      }
      if (name === "birthdate" && !value) {
        errorKey = "validation.birthdate_required";
      }
      if (name === "socialMediaProfileLink" && !value.trim()) {
        errorKey = "validation.social_media_required";
      }
      if (name === "country" && !value.trim()) {
        errorKey = "validation.country_required";
      }
      // Age check based on birthdate
      if (name === "birthdate" && value) {
        const birthdate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
          age--;
        }
        if (age < 18) {
          errorKey = "validation.age_requirement";
        }
      }
    } else if (page === "forgot-password") {
      if (name === "email" && !value.trim()) {
        errorKey = "validation.email_required";
      }
    } else if (page === "change_password") {
      if (name === "newPassword") {
        if (!value.trim()) {
          errorKey = "validation.new_password_required";
        } else if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/)) {
          errorKey = "validation.password_complexity";
        }
      }
      if (name === "confirmNewPassword") {
        if (!value.trim()) {
          errorKey = "validation.confirm_new_password_required";
        } else if (form.newPassword && value !== form.newPassword) {
          errorKey = "validation.password_mismatch";
        }
      }
    }
    return errorKey;
  };

  // Handle change with on-the-fly validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const fieldError = validateField(name, value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (fieldError) {
        newErrors[name] = fieldError;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the entire form on submit
    const formErrors = {};
    // Loop over each field in the form that requires validation
    for (const [key, value] of Object.entries(form)) {
      if (
        (page === "login" && ["email", "password"].includes(key)) ||
        (page === "register" &&
          [
            "firstName",
            "lastName",
            "email",
            "password",
            "confirmPassword",
            "phoneNumber",
            "personalNumber",
            "birthdate",
            "socialMediaProfileLink",
            "country",
          ].includes(key)) ||
        (page === "forgot-password" && key === "email") ||
        (page === "change_password" && ["newPassword", "confirmNewPassword"].includes(key))
      ) {
        const errorKey = validateField(key, value);
        if (errorKey) {
          formErrors[key] = errorKey;
        }
      }
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);

    try {
      let response;
      if (page === "register") {
        response = await api.post("/auth/register", form);
        console.log("Registration Successful:", response.data);
        setSuccess("success.registration");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          personalNumber: "",
          birthdate: "",
          socialMediaProfileLink: "",
          socialMediaPlatform: "",
          socialMediaUsername: "",
          country: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/login");
        }, 1000);
      } else if (page === "login") {
        response = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        const { accessToken: token } = response.data;
        saveToken(token);
        navigate("/profile");
      } else if (page === "forgot-password") {
        response = await api.post("/auth/request-password-reset", {
          email: form.email,
        });
        console.log("Reset Email Sent:", response.data);
        setSuccess("success.reset_email_sent");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (page === "change_password") {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        if (!token) {
          setErrors({ general: "error.invalid_token" });
          setIsSubmitting(false);
          return;
        }
        response = await api.post("/Auth/reset-password", {
          token: token,
          newPassword: form.newPassword,
        });
        console.log("Password Reset Successful:", response.data);
        setSuccess("success.password_reset");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      const status = error.response?.status || 0;
      if (status === 401) {
        // Use the network's error message if available.
        const errorMessage = error.response?.data?.message || "Wrong credentials";
        setErrors({ general: errorMessage });
      } else if(status == 400 && page == "register"){
        const errorMessage = error.response?.data?.message || t('error.email_exists');
        setErrors({ general: errorMessage });
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        const friendlyMessage = getFriendlyErrorMessage(
          status,
          error.response?.data?.message,
          t
        );
        setErrors({ general: friendlyMessage });
      }
      setIsSubmitting(false);
    } finally {
      if (page !== "register") {
        setIsSubmitting(false);
      }
    }
  };

  // Password rules for registration (using form.password)
  const registrationPasswordRules = [
    {
      label: t("password_rules.length", "At least 8 characters long"),
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

  // Password rules for resetting password (using form.newPassword)
  const resetPasswordRules = [
    {
      label: t("password_rules.length", "At least 8 characters long"),
      isValid: form.newPassword.length >= 8,
    },
    {
      label: t("password_rules.uppercase", "At least one uppercase letter"),
      isValid: /[A-Z]/.test(form.newPassword),
    },
    {
      label: t("password_rules.lowercase", "At least one lowercase letter"),
      isValid: /[a-z]/.test(form.newPassword),
    },
    {
      label: t("password_rules.special", "At least one special character"),
      isValid: /[^A-Za-z0-9]/.test(form.newPassword),
    },
  ];

  const renderLogin = () => (
    <>
      <h1 className="auth-title">{t("auth.login_title", "Login")}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
       
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
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="error-text">{t(errors.email, "Email is required.")}</div>
          )}
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
            disabled={isSubmitting}
          />
          {errors.password && (
            <div className="error-text">{t(errors.password, "Password is required.")}</div>
          )}
        </div>
          {errors.general && (
          <div className="error-text">{errors.general}</div>
        )}
        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {t("auth.sign_in", "Sign in")}
        </button>
        <section className="auth-links">
        <p className="auth-link">
          {t("auth.no_account", "Don't have an account?")}{" "}
          <Link to="/register">{t("auth.register_here", "Register here")}</Link>
        </p>
        <p className="auth-link">
          {t("auth.forgot_password", "Forgot your password?")}{" "}
          <Link to="/forgot-password">{t("auth.reset_here", "Reset here")}</Link>
        </p>
       </section>
      </form>
    </>
  );

  const renderRegister = () => {
    const fields = [
      { name: "firstName", label: t("auth.first_name", "First Name") },
      { name: "lastName", label: t("auth.last_name", "Last Name") },
      { name: "email", label: t("auth.email_label", "Email"), type: "email" },
      { name: "password", label: t("auth.password_label", "Password"), type: "password" },
      { name: "confirmPassword", label: t("auth.confirm_password", "Re-enter Password"), type: "password" },
      { name: "birthdate", label: t("auth.birthdate", "Birthdate"), type: "date" },
    ];

    return (
      <>
        <h1 className="auth-title">{t("register")}</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="error-text">{errors.general}</div>
          )}
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
                disabled={isSubmitting}
              />
              {errors[name] && (
                <div className="error-text">
                  {t(errors[name], label + " is required")}
                </div>
              )}
              {name === "password" &&
                passwordTouched &&
                form.password.length > 0 && (
                  <div className="password-rules">
                    {registrationPasswordRules.map((rule, index) => (
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
            </div>
          ))}
         <div className="form-group">
  <label htmlFor="socialMediaProfileLink" className="form-label">
    {t("auth.social_media_link", "Social Media Profile")}
    <span
      className="info-tooltip"
      data-tooltip={t(
        "auth.public_profile_info",
        "Note: your social profile must be public for others to see it."
      )}
      aria-label={t(
        "auth.public_profile_info",
        "Note: your social profile must be public for others to see it."
      )}
    >
     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
</svg>
    </span>
  </label>
  <input
    type="text"
    name="socialMediaProfileLink"
    id="socialMediaProfileLink"
    className="form-input"
    placeholder={t(
      "auth.social_media_profile_link",
      "https://facebook.com/username or etc."
    )}
    onChange={handleChange}
    value={form.socialMediaProfileLink}
    disabled={isSubmitting}
  />
  {errors.socialMediaProfileLink && (
    <div className="error-text">
      {t(errors.socialMediaProfileLink, "Social Media Link is required.")}
    </div>
  )}
</div>
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              {t("auth.country", "Country")}
            </label>
            <select
              name="country"
              id="country"
              className="form-input"
              onChange={(e) => {
                handleChange(e);
                // Update georgiaSelected based on selected value
                if (e.target.value === "Georgia") {
                  setGeorgiaSelected(true);
                } else {
                  setGeorgiaSelected(false);
                }
              }}
              value={form.country}
              disabled={isSubmitting}
            >
              <option value="">{t("auth.select_country", "Select a country")}</option>
              <option value="Georgia">Georgia</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && (
              <div className="error-text">{t(errors.country, "Country is required")}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="personalNumber" className="form-label">
              {t("auth.personal_number_format", "Personal Number")}
            </label>
            <input
              type="text"
              name="personalNumber"
              id="personalNumber"
              className="form-input"
              placeholder={
                georgiaSelected
                  ? t("auth.personal_number_placeholder_georgia", "Enter your personal number")
                  : t("auth.personal_number_placeholder_non_georgia", "Enter your passport/personal number")
              }
              onChange={handleChange}
              value={form.personalNumber}
              disabled={isSubmitting}
            />
            {errors.personalNumber && (
              <div className="error-text">
                {t(errors.personalNumber, "Personal Number is required")}
              </div>
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
                    phoneNumber: `${e.target.value}${prev.phoneNumber.replace(/^\+\d+/, "")}`,
                  }))
                }
                disabled={isSubmitting}
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
                placeholder={t("auth.phone_placeholder", "+995 599 123 456")}
                onChange={handleChange}
                value={form.phoneNumber}
                disabled={isSubmitting}
              />
            </div>
            {errors.phoneNumber && (
              <div className="error-text">{t(errors.phoneNumber, "Phone Number is required")}</div>
            )}
          </div>
          {success && (
            <div className="success-text" style={{ color: "green", marginBottom: "1rem" }}>
              {t(success, "Operation successful")}
            </div>
          )}
          <div className="terms-and-conditions">
                          <label htmlFor="termsCheckbox" className="terms-label">
                            <input type="checkbox" required id="termsCheckbox" />
                            <span className="terms-checkbox"></span>
                            <span className="terms-text">
                              <span
                                className="required-asterisk"
                                style={{ color: "red", marginRight: "4px" }}
                              >
                                *
                              </span>
                              By creating an account, I confirm that I have read and accept our{" "}
                              <Link className="terms-link" to="/terms">
                                Terms and Conditions
                              </Link>
                              . I understand that my registration signifies my agreement to abide by these terms.
                            </span>
                          </label>
                        </div>
          <button type="submit" className="auth-button" disabled={isSubmitting}>
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
        {errors.general && (
          <div className="error-text">{t(errors.general, "An error occurred")}</div>
        )}
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
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="error-text">{t(errors.email, "Email is required")}</div>
          )}
        </div>
        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {t("auth.reset_password", "Reset Password")}
        </button>
        <p className="auth-link">
          {t("auth.remembered", "Remembered?")}{" "}
          <Link to="/login">{t("auth.login_here", "Login here")}</Link>
        </p>
      </form>
    </>
  );

  const renderChangePassword = () => (
    <>
      <h1 className="auth-title">{t("auth.reset_password", "Reset Password")}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
      {errors.general && (
  <div className="error-text">{t(errors.general, "An error occurred")}</div>
)}
        <div className="success-text" style={{ color: "green", marginBottom: "1rem" }}>
          {t(success, "")}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            {t("auth.new_password", "New Password")}
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-input"
            placeholder={t("auth.new_password", "New Password")}
            onChange={(e) => {
              handleChange(e);
              if (e.target.name === "newPassword" && !passwordTouched) {
                setPasswordTouched(true);
              }
            }}
            value={form.newPassword || ""}
            disabled={isSubmitting}
          />
          {errors.newPassword && (
            <div className="error-text">{t(errors.newPassword, "New password is required")}</div>
          )}
          {passwordTouched && (
            <div className="password-rules">
              {resetPasswordRules.map((rule, index) => (
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
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword" className="form-label">
            {t("auth.confirm_new_password", "Confirm New Password")}
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            className="form-input"
            placeholder={t("auth.confirm_new_password", "Confirm New Password")}
            value={form.confirmNewPassword}
            disabled={isSubmitting}
            onChange={(e) => {
              handleChange(e);
              if (!confirmPasswordTouched) {
                setConfirmPasswordTouched(true);
              }
            }}
          />
          {errors.confirmNewPassword && (
            <div className="error-text">{t(errors.confirmNewPassword, "Please confirm your new password")}</div>
          )}
          {confirmPasswordTouched && (
            <div
              className="password-match"
              style={{
                color: form.newPassword === form.confirmNewPassword ? "green" : "red",
                fontSize: "0.9rem",
                marginTop: "0.5rem",
              }}
            >
              {form.newPassword === form.confirmNewPassword &&
              form.newPassword.length !== 0
                ? t("auth.passwords_match", "Passwords match")
                : t("auth.passwords_do_not_match", "Passwords do not match")}
            </div>
          )}
        </div>
        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {t("auth.reset_password", "Reset Password")}
        </button>
      </form>
    </>
  );

  return (
    <section className="auth-container">
      <div className="auth-box">
        {page === "login" && renderLogin()}
        {page === "register" && renderRegister()}
        {page === "forgot-password" && renderForgotPassword()}
        {page === "change_password" && renderChangePassword()}
      </div>
    </section>
  );
};

export default AuthPage;
