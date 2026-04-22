// client/src/pages/NotFound.js

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-container single-panel">
        <div className="auth-right full-width-card">
          <div className="auth-form-card notfound-card">
            <div className="brand-badge">404 Error</div>
            <h2>Page not found</h2>
            <p className="auth-subtitle">
              The page you are looking for does not exist or may have been moved.
            </p>

            <div className="notfound-actions">
              <Link to="/dashboard" className="primary-btn auth-btn">
                Go to Dashboard
              </Link>

              <Link to="/login" className="secondary-btn auth-btn">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;