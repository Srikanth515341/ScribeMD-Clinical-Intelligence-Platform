// client/src/pages/NewConsultation.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SessionForm from "../components/SessionForm";

const NewConsultation = () => {
  const navigate = useNavigate();

  const handleConsultationCreated = (consultation) => {
    if (consultation?.id) {
      navigate(`/consultations/${consultation.id}`);
    } else {
      navigate("/consultations");
    }
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="consultation-page">
        <section className="page-hero">
          <div className="page-hero-content">
            <div className="hero-badge">New Clinical Session</div>
            <h1>Create a new consultation workflow</h1>
            <p>
              Register a patient, capture consultation details, and initiate the
              clinical documentation process from a single streamlined view.
            </p>
          </div>
        </section>

        <section className="page-section">
          <SessionForm onSuccess={handleConsultationCreated} />
        </section>
      </main>
    </div>
  );
};

export default NewConsultation;