// client/src/pages/ConsultationHistory.js

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { formatDateTime, truncateText } from "../utils/helpers";

const ConsultationHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [consultationsRes, patientsRes] = await Promise.all([
        API.get("/consultations/"),
        API.get("/patients/"),
      ]);

      setConsultations(consultationsRes.data || []);
      setPatients(patientsRes.data || []);
    } catch (error) {
      console.error("Failed to fetch consultation history:", error);
    } finally {
      setLoading(false);
    }
  };

  const patientMap = useMemo(() => {
    const map = {};
    patients.forEach((patient) => {
      map[patient.id] = patient;
    });
    return map;
  }, [patients]);

  const filteredConsultations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return consultations;

    return consultations.filter((consultation) => {
      const patient = patientMap[consultation.patient_id];
      const patientName = patient?.full_name?.toLowerCase() || "";
      const transcript = consultation.transcript?.toLowerCase() || "";
      const symptoms = consultation.symptoms?.toLowerCase() || "";
      const status = consultation.status?.toLowerCase() || "";

      return (
        patientName.includes(query) ||
        transcript.includes(query) ||
        symptoms.includes(query) ||
        status.includes(query) ||
        String(consultation.id).includes(query)
      );
    });
  }, [consultations, patientMap, search]);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="consultation-page">
        <section className="page-hero compact-hero">
          <div className="page-hero-content">
            <div className="hero-badge">Consultation Records</div>
            <h1>Consultation history</h1>
            <p>
              Review all clinical sessions, track note generation status, and
              open any consultation for detailed clinical output.
            </p>
          </div>
        </section>

        <section className="page-section">
          <div className="history-toolbar">
            <div className="search-box-wrapper">
              <input
                type="text"
                placeholder="Search by patient, transcript, symptoms, status, or consultation ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <Link to="/consultation/new" className="primary-btn">
              New Consultation
            </Link>
          </div>

          {loading ? (
            <Loader text="Loading consultation history..." />
          ) : filteredConsultations.length === 0 ? (
            <div className="dashboard-card empty-state-card">
              <div className="empty-state">
                <h3>No matching consultations found</h3>
                <p>
                  Try a different search or create a new consultation workflow.
                </p>
              </div>
            </div>
          ) : (
            <div className="history-list">
              {filteredConsultations.map((consultation) => {
                const patient = patientMap[consultation.patient_id];

                return (
                  <Link
                    to={`/consultations/${consultation.id}`}
                    key={consultation.id}
                    className="history-card"
                  >
                    <div className="history-card-top">
                      <div>
                        <span className="history-id">
                          Consultation #{consultation.id}
                        </span>
                        <h3>{patient?.full_name || "Unknown Patient"}</h3>
                      </div>

                      <span
                        className={`status-badge ${
                          consultation.status === "completed"
                            ? "status-completed"
                            : "status-pending"
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </div>

                    <div className="history-meta-grid">
                      <div className="history-meta-item">
                        <span>Patient Details</span>
                        <strong>
                          {patient
                            ? `${patient.age} years • ${patient.gender}`
                            : "Unavailable"}
                        </strong>
                      </div>

                      <div className="history-meta-item">
                        <span>Created</span>
                        <strong>{formatDateTime(consultation.created_at)}</strong>
                      </div>
                    </div>

                    <div className="history-content">
                      <div className="history-block">
                        <h4>Symptoms</h4>
                        <p>
                          {consultation.symptoms
                            ? truncateText(consultation.symptoms, 140)
                            : "No symptoms added."}
                        </p>
                      </div>

                      <div className="history-block">
                        <h4>Transcript</h4>
                        <p>{truncateText(consultation.transcript, 220)}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ConsultationHistory;