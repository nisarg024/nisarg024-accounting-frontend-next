"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import MainTab from "./tabs/MainTab";

const Table = ({ tableData }) => {
  const searchParams = useSearchParams();
  const tabName = searchParams.get("tab");
  const [activeKey, setActiveKey] = useState(null);
  const handleToggle = async (key, item) => {
    if (activeKey === key) {
      setActiveKey(null);
    } else {
      setActiveKey(key);
    }
  };

  const handleInputChange = async (event, rowIndex, tableIndex, field) => {
    const { value } = event.target;

    // Deep clone the tableData array and nested objects
    const updatedTableData = JSON.parse(JSON.stringify(tableData));

    const key = updatedTableData[tableIndex].tables[rowIndex];

    // Update the specific field for the row
    key[field] = value || 0;
    if (field === "two_Piece") {
      const price = updatedTableData[tableIndex].two_Piece_price;
      key.two_Piece_total = value * price || null;
    }

    if (field === "ok_nang") {
      const price = updatedTableData[tableIndex].main_price;
      key.amount = value * price || null;
    }

    if (field === "galaxy_nang") {
      const price = updatedTableData[tableIndex].galaxy_price;
      key.galaxy_total = value * price || null;
    }

    if (field === "og_active") {
      const price = updatedTableData[tableIndex].og_active_price;
      key.og_active_total = value * price || null;
    }
    if (field === "multi") {
      const price = updatedTableData[tableIndex].multi_price;
      key.multi_total = value * price || null;
    }
    if (field === "pie") {
      const price = updatedTableData[tableIndex].pie_price;
      key.pie_total = value * price || null;
    }
    if (field === "active") {
      const price = updatedTableData[tableIndex].active_price;
      key.active_total = value * price || null;
    }
    if (field === "re_cut") {
      const price = updatedTableData[tableIndex].re_cut_price;
      key.re_cut_total = value * price || null;
    }
    if (field === "four_p") {
      const price = updatedTableData[tableIndex].four_p_price;
      key.four_p_total = value * price || null;
    }

    key["row_total"] =
      (key.two_Piece_total || 0) + (key.amount || 0) + (key.galaxy_total || 0);

    // Set the updated state

    key["galaxy_row_total"] =
      (Number(key.og_active_total) || 0) +
      (Number(key.multi_total) || 0) +
      (Number(key.pie_total) || 0) +
      (Number(key.active_total) || 0) +
      (Number(key.re_cut_total) || 0) +
      (Number(key.four_p_total) || 0);

    setTableData(updatedTableData);
  };

  return (
    <Accordion activeKey={activeKey}>
      <div id="content-to-download">
        {tableData?.length > 0 ? (
          tableData.map((item, tableIndex) => (
            <Accordion.Item
              key={tableIndex}
              className="card mb-4"
              eventKey={tableIndex}
            >
              <Accordion.Header
                className="align-items-center my-1"
                onClick={() => handleToggle(tableIndex, item)}
              >
                <span>
                  {item?.month.slice(0, 3)}-{item?.year}
                </span>
                {tabName === "Main" && (
                  <span className="hstack">
                    <div className="vr mx-2" />
                    <span className="badge bg-label-info">
                      <label className="pe-1" htmlFor="two_Piece_price">
                        2Piece-price :
                      </label>
                      {item?.two_Piece_price || 0}
                    </span>

                    <div className="vr mx-2" />

                    <span className="badge bg-label-success">
                      <label className="pe-1" htmlFor="two_Piece_price">
                        Ok Nung-price :
                      </label>
                      {item?.main_price || 0}
                    </span>

                    <div className="vr mx-2" />

                    <span className="badge bg-label-danger">
                      <label className="pe-1" htmlFor="galaxy_price">
                        Galaxy-price :
                      </label>
                      {item?.galaxy_price || 0}
                    </span>

                    <div className="d-flex justify-content-center ps-2">
                      <i
                        className="ti ti-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPriceModal(true);
                          setSingleTableData({ data: item, tableIndex });
                        }}
                      />
                    </div>
                  </span>
                )}
                <div className="position-absolute" style={{ right: "50px" }}>
                  <i
                    className="ti ti-trash-x mb-2 text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModal(true);
                      setIsData(item);
                    }}
                  />
                </div>

                <div
                  className="position-absolute"
                  style={{ right: "80px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSingleTable(item);
                    setTimeout(() => {
                      downloadPdfById();
                    }, 100);
                  }}
                >
                  <i className="ti ti-download mb-2 text-gray" />
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {tabName === "Main" ? (
                  <MainTab
                    item={item}
                    tableIndex={tableIndex}
                    handleInputChange={handleInputChange}
                  />
                ) : (
                  <></>
                  // <GalaxyTab
                  //   item={item}
                  //   loading={loading}
                  //   download={false}
                  //   tableIndex={tableIndex}
                  //   priceEditRow={priceEditRow}
                  //   handlePriceSave={handlePriceSave}
                  //   handleInputChange={handleInputChange}
                  //   handlePriceEditClick={handlePriceEditClick}
                  //   handlePriceInputChange={handlePriceInputChange}
                  // />
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div className="text-center card py-4">No data found</div>
        )}
      </div>
    </Accordion>
  );
};

export default Table;
