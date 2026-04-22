// client/src/pages/Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { saveAuthData } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchProfile = async () => {
    const response = await API.get("/users/me");
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await API.post("/auth/login", formData);
      const token = response.data.access_token;

      saveAuthData(token);

      const user = await fetchProfile();
      saveAuthData(token, user);

      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-left">
          <div className="brand-badge">Clinical AI Workflow</div>
          <h1>Welcome back to ClinicalDocAI</h1>
          <p>
            Sign in to manage consultations, generate structured clinical notes,
            and access your documentation workflow from one secure dashboard.
          </p>

          <div className="auth-highlights">
            <div className="highlight-card">
              <h3>AI Documentation</h3>
              <p>Generate SOAP-style notes from consultation transcripts.</p>
            </div>

            <div className="highlight-card">
              <h3>Fast Clinical Workflow</h3>
              <p>Track sessions, manage patients, and export notes in seconds.</p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-card">
            <h2>Doctor Login</h2>
            <p className="auth-subtitle">
              Access your secure clinical workspace.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Enter your password"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="primary-btn auth-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="auth-switch">
              Don’t have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;