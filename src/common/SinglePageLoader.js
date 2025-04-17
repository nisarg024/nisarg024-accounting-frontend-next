import React from "react";

const SinglePageLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: `calc(100vh - 24px)` }}
    >
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
};

export default SinglePageLoader;
