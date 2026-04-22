// client/src/pages/Dashboard.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { formatDateTime, truncateText, getInitials } from "../utils/helpers";
import { getUser } from "../utils/auth";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = getUser();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [patientsRes, consultationsRes] = await Promise.all([
        API.get("/patients/"),
        API.get("/consultations/"),
      ]);

      setPatients(patientsRes.data || []);
      setConsultations(consultationsRes.data || []);
    } catch (error) {
      console.error("Dashboard data fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const completedCount = consultations.filter(
    (item) => item.status === "completed"
  ).length;

  const pendingCount = consultations.filter(
    (item) => item.status === "pending"
  ).length;

  const recentConsultations = consultations.slice(0, 5);
  const recentPatients = patients.slice(0, 5);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard-page">
        <section className="hero-panel">
          <div className="hero-content">
            <div className="hero-badge">Clinical Workflow Intelligence</div>
            <h1>
              Welcome back{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}
            </h1>
            <p>
              Manage patients, create consultations, generate structured notes,
              and streamline medical documentation from one unified workspace.
            </p>

            <div className="hero-actions">
              <Link to="/consultation/new" className="primary-btn">
                Start New Consultation
              </Link>
              <Link to="/consultations" className="secondary-btn">
                View Consultation History
              </Link>
            </div>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Patients</span>
              <h3>{patients.length}</h3>
              <p>Registered patient profiles in your workspace.</p>
            </div>

            <div className="stat-card">
              <span className="stat-label">Consultations</span>
              <h3>{consultations.length}</h3>
              <p>All created consultation sessions.</p>
            </div>

            <div className="stat-card">
              <span className="stat-label">Completed Notes</span>
              <h3>{completedCount}</h3>
              <p>Consultations with generated clinical notes.</p>
            </div>

            <div className="stat-card">
              <span className="stat-label">Pending</span>
              <h3>{pendingCount}</h3>
              <p>Sessions waiting for note generation.</p>
            </div>
          </div>
        </section>

        {loading ? (
          <Loader text="Loading dashboard..." />
        ) : (
          <section className="dashboard-grid">
            <div className="dashboard-card wide-card">
              <div className="section-header">
                <div>
                  <h2>Recent Consultations</h2>
                  <p>Latest consultation sessions and note workflow status.</p>
                </div>

                <Link to="/consultations" className="section-link">
                  View all
                </Link>
              </div>

              {recentConsultations.length === 0 ? (
                <div className="empty-state">
                  <h3>No consultations yet</h3>
                  <p>
                    Create your first consultation to begin generating clinical
                    notes.
                  </p>
                  <Link to="/consultation/new" className="primary-btn">
                    Create Consultation
                  </Link>
                </div>
              ) : (
                <div className="consultation-list">
                  {recentConsultations.map((item) => (
                    <Link
                      to={`/consultations/${item.id}`}
                      key={item.id}
                      className="consultation-item"
                    >
                      <div className="consultation-meta">
                        <div className="consultation-avatar">
                          #{item.id}
                        </div>

                        <div>
                          <h3>Consultation #{item.id}</h3>
                          <p>{truncateText(item.transcript, 90)}</p>
                        </div>
                      </div>

                      <div className="consultation-side">
                        <span
                          className={`status-badge ${
                            item.status === "completed"
                              ? "status-completed"
                              : "status-pending"
                          }`}
                        >
                          {item.status}
                        </span>
                        <small>{formatDateTime(item.created_at)}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="section-header">
                <div>
                  <h2>Recent Patients</h2>
                  <p>Latest patient records created in the system.</p>
                </div>
              </div>

              {recentPatients.length === 0 ? (
                <div className="empty-state compact-empty">
                  <p>No patients created yet.</p>
                </div>
              ) : (
                <div className="patient-list">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="patient-item">
                      <div className="patient-avatar">
                        {getInitials(patient.full_name)}
                      </div>

                      <div className="patient-info">
                        <h4>{patient.full_name}</h4>
                        <p>
                          {patient.age} years • {patient.gender}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="section-header">
                <div>
                  <h2>Workflow Snapshot</h2>
                  <p>Quick overview of your documentation pipeline.</p>
                </div>
              </div>

              <div className="workflow-list">
                <div className="workflow-row">
                  <span>Create patient profiles</span>
                  <strong>{patients.length}</strong>
                </div>
                <div className="workflow-row">
                  <span>Consultation sessions</span>
                  <strong>{consultations.length}</strong>
                </div>
                <div className="workflow-row">
                  <span>Notes generated</span>
                  <strong>{completedCount}</strong>
                </div>
                <div className="workflow-row">
                  <span>Awaiting note generation</span>
                  <strong>{pendingCount}</strong>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;