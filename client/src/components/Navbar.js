// client/src/components/Navbar.js

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logoutUser } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active-link" : "nav-link";
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="brand-logo">
          ClinicalDocAI
        </Link>
      </div>

      <nav className="navbar-center">
        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>

        <Link
          to="/consultation/new"
          className={isActive("/consultation/new")}
        >
          New Consultation
        </Link>

        <Link
          to="/consultations"
          className={isActive("/consultations")}
        >
          History
        </Link>
      </nav>

      <div className="navbar-right">
        <div className="user-badge">
          {user?.full_name ? user.full_name : "Doctor"}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;