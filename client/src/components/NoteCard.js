// client/src/components/NoteCard.js

import React from "react";
import { formatDateTime } from "../utils/helpers";

const NoteCard = ({ note }) => {
  if (!note) return null;

  return (
    <div className="note-card">
      <div className="note-card-header">
        <div>
          <h3>Clinical Note</h3>
          <p>Generated on {formatDateTime(note.created_at)}</p>
        </div>

        <span className="note-badge">{note.ai_mode || "mock"}</span>
      </div>

      <div className="note-section">
        <h4>Subjective</h4>
        <p>{note.subjective || "No subjective details available."}</p>
      </div>

      <div className="note-section">
        <h4>Objective</h4>
        <p>{note.objective || "No objective details available."}</p>
      </div>

      <div className="note-section">
        <h4>Assessment</h4>
        <p>{note.assessment || "No assessment details available."}</p>
      </div>

      <div className="note-section">
        <h4>Plan</h4>
        <p>{note.plan || "No plan details available."}</p>
      </div>
    </div>
  );
};

export default NoteCard;