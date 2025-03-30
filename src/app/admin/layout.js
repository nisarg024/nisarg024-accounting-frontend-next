import Sidemenu from "@/components/sidemenu/Sidemenu";
import React from "react";

const Admin = ({ children }) => {
  return (
    <div
      className={`light-style layout-navbar-fixed layout-compact layout-menu-fixed`}
    >
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container justify-content-center">
          <Sidemenu />
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-fluid flex-grow-1 container-p-y ">
                {children}
              </div>
            </div>
            {/* <Navbar setToggle={setToggle} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
