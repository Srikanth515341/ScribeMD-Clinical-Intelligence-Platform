// client/src/routes.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewConsultation from "./pages/NewConsultation";
import ConsultationHistory from "./pages/ConsultationHistory";
import ConsultationDetail from "./pages/ConsultationDetail";
import NotFound from "./pages/NotFound";

import { isAuthenticated } from "./utils/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultation/new"
        element={
          <ProtectedRoute>
            <NewConsultation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultations"
        element={
          <ProtectedRoute>
            <ConsultationHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultations/:id"
        element={
          <ProtectedRoute>
            <ConsultationDetail />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;