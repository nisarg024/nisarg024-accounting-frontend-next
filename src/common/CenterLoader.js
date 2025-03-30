import React from "react";

const CenterLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: `calc(100vh - 100px)` }}
    >
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
};

export default CenterLoader;
