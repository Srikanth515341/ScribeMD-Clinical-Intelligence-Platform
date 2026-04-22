// client/src/App.js

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./styles/App.css";
import "./styles/Auth.css";
import "./styles/Dashboard.css";
import "./styles/Consultation.css";
import "./styles/Navbar.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;