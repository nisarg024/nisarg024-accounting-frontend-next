import { useRouter } from "next-nprogress-bar";
import React from "react";
import { TbFilterCog } from "react-icons/tb";

const NavTab = ({ tabs, active, setActive }) => {
  const router = useRouter();

  const handleActiveTab = async (item) => {
    setActive(item?.tableName);
    router.push(`?tab=${item?.tableName}`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <ul className="nav nav-pills flex-column flex-sm-row">
        {tabs?.length > 0 &&
          tabs?.map((item) => {
            return (
              <li
                key={item?._id}
                onClick={() => handleActiveTab(item)}
                className="nav-item"
              >
                <a
                  className={`nav-link cursor-pointer ${
                    active === item?.tableName ? "active" : ""
                  }`}
                >
                  {item?.tableName}
                </a>
              </li>
            );
          })}
      </ul>
      <div className="d-flex gap-2 align-items-center">
        <button
          onClick={() => setFilterModalShow(true)}
          type="button"
          className="btn btn-icon waves-effect border border-primary rounded-circle d-flex justify-content-center align-items-center cursor-pointer"
          style={{ height: "2.3rem", width: "2.3rem" }}
        >
          <TbFilterCog className="text-primary h5 mb-0" />
        </button>
        <button
          onClick={() => setShow(true)}
          className="dt-button create-new btn btn-primary waves-effect waves-light"
          type="button"
        >
          <span>
            <i className="ti ti-plus me-sm-1" />
            <span className="d-none d-sm-inline-block">Add Table</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavTab;
