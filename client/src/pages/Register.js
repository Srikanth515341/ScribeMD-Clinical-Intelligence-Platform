// client/src/pages/Register.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await API.post("/auth/register", formData);

      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-left">
          <div className="brand-badge">Healthcare Documentation Platform</div>
          <h1>Create your ClinicalDocAI account</h1>
          <p>
            Set up your doctor workspace to manage patients, create
            consultations, generate clinical notes, and streamline your medical
            documentation flow.
          </p>

          <div className="auth-highlights">
            <div className="highlight-card">
              <h3>Secure Access</h3>
              <p>Protected doctor-only authentication with private workflows.</p>
            </div>

            <div className="highlight-card">
              <h3>Clinical Productivity</h3>
              <p>Reduce note-writing time and organize consultations clearly.</p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-card">
            <h2>Doctor Registration</h2>
            <p className="auth-subtitle">
              Build your secure clinical documentation account.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                />
              </div>

              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}

              <button
                type="submit"
                className="primary-btn auth-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;