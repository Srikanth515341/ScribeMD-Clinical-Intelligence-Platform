// client/src/components/ExportButton.js

import React, { useState } from "react";
import API from "../api/axios";

const ExportButton = ({ consultationId }) => {
  const [loadingType, setLoadingType] = useState("");

  const handleExport = async (type) => {
    try {
      setLoadingType(type);
      await API.post(`/exports/${consultationId}/${type}`);
      alert(`Exported successfully as ${type.toUpperCase()}`);
    } catch (error) {
      alert(
        error?.response?.data?.detail ||
          `Failed to export as ${type.toUpperCase()}`
      );
    } finally {
      setLoadingType("");
    }
  };

  return (
    <div className="export-actions">
      <button
        className="secondary-btn"
        onClick={() => handleExport("json")}
        disabled={loadingType !== ""}
      >
        {loadingType === "json" ? "Exporting..." : "Export JSON"}
      </button>

      <button
        className="secondary-btn"
        onClick={() => handleExport("pdf")}
        disabled={loadingType !== ""}
      >
        {loadingType === "pdf" ? "Exporting..." : "Export PDF"}
      </button>

      <button
        className="secondary-btn"
        onClick={() => handleExport("ehr")}
        disabled={loadingType !== ""}
      >
        {loadingType === "ehr" ? "Exporting..." : "Export EHR"}
      </button>
    </div>
  );
};

export default ExportButton;