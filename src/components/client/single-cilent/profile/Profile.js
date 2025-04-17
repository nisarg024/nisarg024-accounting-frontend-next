import React from "react";

const Profile = ({ data = {} }) => {
  const { firstName, lastName } = data;
  return (
    <div className="col-xl-3 col-lg-5 col-md-5 order-1 order-md-0">
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="small text-uppercase text-muted">Details</p>
          </div>
          <div className="info-container">
            <ul className="list-unstyled m-0">
              <li>
                <span className="fw-medium me-1">Name:</span>
                <span>
                  {firstName} {lastName}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
