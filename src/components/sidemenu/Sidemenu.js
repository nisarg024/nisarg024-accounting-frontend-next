"use client";
import React from "react";
import SvgLogo from "./SvgLogo";
import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Sidemenu = () => {
  const router = useRouter();

  return (
    <aside
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo ">
        <a href="#" className="app-brand-link">
          <span className="app-brand-logo demo">
            <SvgLogo />
          </span>
          <span className="app-brand-text demo menu-text fw-bold">
            Accounting
          </span>
        </a>
        <div
          // onClick={() => setIsFixed((prev) => !prev)}
          className="layout-menu-toggle menu-link text-large ms-auto"
        >
          <i className="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle" />
          <i
            className="ti ti-x d-block d-xl-none ti-sm align-middle"
            // onClick={() => setToggle(false)}
          />
        </div>
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1 overflow-hidden">
        {routes?.map((item, i) => (
          <li key={i} className={`menu-item `}>
            <a
              // href={item?.path}
              className="menu-link"
              // onClick={() => setToggle(false)}
            >
              <i className={`menu-icon tf-icons ti ${item.icon}`} />
              <div data-i18n="Email">{item.name}</div>
            </a>
          </li>
        ))}
        <li className="menu-item mt-auto">
          <a
            onClick={() => {
              Cookies.remove("auth_token");
              router.push("/login");
            }}
            className="menu-link cursor-pointer"
          >
            <i className="menu-icon ti ti-logout"></i>
            <div data-i18n="Calendar">Logout</div>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidemenu;
