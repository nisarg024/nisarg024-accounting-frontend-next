"use client";
import Sidemenu from "@/components/sidemenu/Sidemenu";
import React, { useEffect, useState } from "react";

const Admin = ({ children }) => {
  const [a, setA] = useState(false);
  useEffect(() => {
    setA(true);
  }, []);
  console.log("🚀 ~ Admin ~ a:", a);
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
