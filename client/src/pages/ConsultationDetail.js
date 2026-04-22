// client/src/pages/ConsultationDetail.js

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import NoteCard from "../components/NoteCard";
import ExportButton from "../components/ExportButton";
import { formatDateTime } from "../utils/helpers";

const ConsultationDetail = () => {
  const { id } = useParams();

  const [consultation, setConsultation] = useState(null);
  const [patient, setPatient] = useState(null);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchConsultationDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchConsultationDetail = async () => {
    try {
      setLoading(true);
      setError("");

      const consultationRes = await API.get(`/consultations/${id}`);
      const consultationData = consultationRes.data;
      setConsultation(consultationData);

      if (consultationData?.patient_id) {
        const patientRes = await API.get(`/patients/${consultationData.patient_id}`);
        setPatient(patientRes.data);
      }

      try {
        const noteRes = await API.get(`/notes/${id}`);
        setNote(noteRes.data);
      } catch (noteError) {
        setNote(null);
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load consultation detail.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNote = async () => {
    try {
      setNoteLoading(true);
      setError("");

      const response = await API.post(`/notes/generate/${id}`);
      setNote(response.data.note);

      const refreshedConsultation = await API.get(`/consultations/${id}`);
      setConsultation(refreshedConsultation.data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to generate clinical note.");
    } finally {
      setNoteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="consultation-page">
          <Loader text="Loading consultation details..." />
        </main>
      </div>
    );
  }

  if (error && !consultation) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="consultation-page">
          <div className="dashboard-card empty-state-card">
            <div className="empty-state">
              <h3>Unable to load consultation</h3>
              <p>{error}</p>
              <Link to="/consultations" className="primary-btn">
                Back to History
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="consultation-page">
        <section className="page-hero compact-hero">
          <div className="page-hero-content">
            <div className="hero-badge">Consultation Detail</div>
            <h1>Consultation #{consultation?.id}</h1>
            <p>
              Review the consultation transcript, patient profile, note generation
              output, and export workflow from one place.
            </p>
          </div>
        </section>

        <section className="page-section detail-layout">
          <div className="detail-main">
            <div className="dashboard-card">
              <div className="section-header">
                <div>
                  <h2>Consultation Overview</h2>
                  <p>Clinical session metadata and consultation transcript.</p>
                </div>

                <span
                  className={`status-badge ${
                    consultation?.status === "completed"
                      ? "status-completed"
                      : "status-pending"
                  }`}
                >
                  {consultation?.status}
                </span>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <span>Consultation ID</span>
                  <strong>#{consultation?.id}</strong>
                </div>

                <div className="detail-item">
                  <span>Created At</span>
                  <strong>{formatDateTime(consultation?.created_at)}</strong>
                </div>

                <div className="detail-item">
                  <span>Patient</span>
                  <strong>{patient?.full_name || "Unknown Patient"}</strong>
                </div>

                <div className="detail-item">
                  <span>Patient Details</span>
                  <strong>
                    {patient ? `${patient.age} years • ${patient.gender}` : "Unavailable"}
                  </strong>
                </div>
              </div>

              <div className="detail-block">
                <h3>Symptoms</h3>
                <p>{consultation?.symptoms || "No symptoms provided."}</p>
              </div>

              <div className="detail-block">
                <h3>Transcript</h3>
                <p className="transcript-text">
                  {consultation?.transcript || "No transcript available."}
                </p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="section-header">
                <div>
                  <h2>Clinical Note</h2>
                  <p>Generate and review structured note output for this session.</p>
                </div>

                {!note && (
                  <button
                    className="primary-btn"
                    onClick={handleGenerateNote}
                    disabled={noteLoading}
                  >
                    {noteLoading ? "Generating..." : "Generate Note"}
                  </button>
                )}
              </div>

              {error && consultation && <p className="error-message">{error}</p>}

              {note ? (
                <NoteCard note={note} />
              ) : (
                <div className="empty-state compact-empty">
                  <p>No clinical note generated yet for this consultation.</p>
                </div>
              )}
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="dashboard-card">
              <div className="section-header">
                <div>
                  <h2>Export Options</h2>
                  <p>Export the generated note in supported formats.</p>
                </div>
              </div>

              {note ? (
                <ExportButton consultationId={consultation?.id} />
              ) : (
                <div className="empty-state compact-empty">
                  <p>Generate a note first to unlock exports.</p>
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="section-header">
                <div>
                  <h2>Patient Contact</h2>
                  <p>Basic profile information from the patient record.</p>
                </div>
              </div>

              <div className="workflow-list">
                <div className="workflow-row">
                  <span>Email</span>
                  <strong>{patient?.email || "Not provided"}</strong>
                </div>
                <div className="workflow-row">
                  <span>Phone</span>
                  <strong>{patient?.phone || "Not provided"}</strong>
                </div>
                <div className="workflow-row">
                  <span>Patient ID</span>
                  <strong>{patient?.id || "-"}</strong>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <Link to="/consultations" className="secondary-btn full-width-btn">
                Back to Consultation History
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ConsultationDetail;