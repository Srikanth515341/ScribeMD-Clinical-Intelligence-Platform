// client/src/components/SessionForm.js

import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Loader from "./Loader";

const SessionForm = ({ onSuccess }) => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: "",
    symptoms: "",
    transcript: "",
  });
  const [patientForm, setPatientForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [submittingPatient, setSubmittingPatient] = useState(false);
  const [submittingConsultation, setSubmittingConsultation] = useState(false);
  const [error, setError] = useState("");
  const [patientError, setPatientError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      const response = await API.get("/patients/");
      setPatients(response.data || []);
    } catch (err) {
      setError("Failed to load patients.");
    } finally {
      setLoadingPatients(false);
    }
  };

  const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    setPatientError("");
    setSuccessMessage("");

    if (!patientForm.full_name || !patientForm.age || !patientForm.gender) {
      setPatientError("Please fill patient name, age, and gender.");
      return;
    }

    try {
      setSubmittingPatient(true);

      const payload = {
        ...patientForm,
        age: Number(patientForm.age),
      };

      const response = await API.post("/patients/", payload);
      const newPatient = response.data.patient;

      setPatients((prev) => [newPatient, ...prev]);
      setFormData((prev) => ({
        ...prev,
        patient_id: String(newPatient.id),
      }));

      setPatientForm({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
      });

      setSuccessMessage("Patient created successfully.");
    } catch (err) {
      setPatientError(
        err?.response?.data?.detail || "Failed to create patient."
      );
    } finally {
      setSubmittingPatient(false);
    }
  };

  const handleCreateConsultation = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.patient_id || !formData.transcript.trim()) {
      setError("Please select a patient and enter consultation transcript.");
      return;
    }

    try {
      setSubmittingConsultation(true);

      const payload = {
        patient_id: Number(formData.patient_id),
        symptoms: formData.symptoms,
        transcript: formData.transcript,
      };

      const response = await API.post("/consultations/", payload);

      setFormData({
        patient_id: "",
        symptoms: "",
        transcript: "",
      });

      setSuccessMessage("Consultation created successfully.");

      if (onSuccess) {
        onSuccess(response.data.consultation);
      }
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Failed to create consultation."
      );
    } finally {
      setSubmittingConsultation(false);
    }
  };

  return (
    <div className="consultation-grid">
      <div className="consultation-card">
        <div className="section-header">
          <h2>Create Patient</h2>
          <p>Add a patient profile before starting a consultation session.</p>
        </div>

        <form onSubmit={handleCreatePatient} className="consultation-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={patientForm.full_name}
              onChange={handlePatientChange}
              placeholder="Enter patient full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={patientForm.age}
                onChange={handlePatientChange}
                placeholder="Age"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={patientForm.gender}
                onChange={handlePatientChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={patientForm.phone}
              onChange={handlePatientChange}
              placeholder="Optional phone number"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={patientForm.email}
              onChange={handlePatientChange}
              placeholder="Optional email"
            />
          </div>

          {patientError && <p className="error-message">{patientError}</p>}

          <button
            type="submit"
            className="primary-btn"
            disabled={submittingPatient}
          >
            {submittingPatient ? "Creating Patient..." : "Create Patient"}
          </button>
        </form>
      </div>

      <div className="consultation-card">
        <div className="section-header">
          <h2>Start Consultation</h2>
          <p>
            Select a patient and submit the consultation transcript for note
            generation.
          </p>
        </div>

        {loadingPatients ? (
          <Loader text="Loading patients..." />
        ) : (
          <form
            onSubmit={handleCreateConsultation}
            className="consultation-form"
          >
            <div className="form-group">
              <label>Select Patient</label>
              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleConsultationChange}
              >
                <option value="">Choose patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.full_name} • {patient.age} • {patient.gender}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Symptoms</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleConsultationChange}
                placeholder="Enter symptoms or presenting complaint"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Transcript</label>
              <textarea
                name="transcript"
                value={formData.transcript}
                onChange={handleConsultationChange}
                placeholder="Paste the doctor-patient consultation transcript here..."
                rows="9"
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <button
              type="submit"
              className="primary-btn"
              disabled={submittingConsultation}
            >
              {submittingConsultation
                ? "Creating Consultation..."
                : "Create Consultation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SessionForm;