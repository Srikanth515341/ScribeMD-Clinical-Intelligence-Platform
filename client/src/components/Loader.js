// client/src/components/Loader.js

import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner"></div>
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;