import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { formatIndianNumber } from "@/utils/formatIndianNumber";
import { tableTotal } from "@/utils/tabelTotal";

const MainTab = ({ item, handleInputChange, tableIndex }) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const two_Piece_total = tableTotal(item?.tables, "two_Piece");
  const nang = tableTotal(item?.tables, "nang");
  const weight = tableTotal(item?.tables, "weight");
  const ok_nang = tableTotal(item?.tables, "ok_nang");
  const galaxy_nang_total = tableTotal(item?.tables, "galaxy_nang");

  const two_piece_total = two_Piece_total * item?.two_Piece_price;
  const ok_nang_total = ok_nang * item?.main_price;
  const galaxyTotal = galaxy_nang_total * item?.galaxy_price;

  const mainTotal = two_piece_total + ok_nang_total + galaxyTotal;
  const upad = tableTotal(item?.tables, "upad");
  const tableTotalColor = upad - mainTotal > 0 ? "text-success" : "text-danger";

  return (
    <div className="table-responsive text-nowrap">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr className="text-center">
            <th>Date</th>
            <th className="text-nowrap">Cut No.</th>
            <th>Nang</th>
            <th>Weight</th>
            <th className="text-nowrap">2-Piece</th>
            <th className="text-nowrap">2-Piece (Total)</th>
            <th className="text-nowrap">Ok Nang</th>
            <th>Ok Nang (Total)</th>
            <th className="text-nowrap">Galaxy</th>
            <th>Galaxy (Total)</th>
            <th>Upad</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-border-bottom-0">
          {item?.tables?.map((tableItem, rowIndex) => {
            console.log("🚀 ~ {item?.tables?.map ~ tableItem:", tableItem);
            return (
              <tr key={rowIndex}>
                <td>
                  <div
                    onClick={() => {
                      setShow(true);
                      setId(tableItem?._id);
                    }}
                    className="d-flex align-items-center justify-content-between text-primary cursor-pointer c-link px-2"
                  >
                    {tableItem?.date} <FaArrowRightLong />
                  </div>
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      id={`${rowIndex}1`}
                      type="number"
                      className="table-input"
                      value={tableItem?.nang || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "nang")
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                    />
                  </div>
                </td>

                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      id={`${rowIndex}2`}
                      type="number"
                      className="table-input"
                      value={tableItem?.weight || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "weight")
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center ">
                    <input
                      id={`${rowIndex}3`}
                      type="number"
                      className="table-input"
                      value={tableItem?.cut_no || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "cut_no")
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                    />
                  </div>
                </td>

                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      id={`${rowIndex}4`}
                      type="number"
                      className="table-input"
                      value={tableItem?.two_Piece || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "two_Piece")
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                    />
                  </div>
                </td>
                <td
                  className="text-center cursor-not-allowed fw-semibold"
                  style={{ color: "black" }}
                >
                  {formatIndianNumber(tableItem.two_Piece_total || "")}
                </td>

                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      id={`${rowIndex}5`}
                      type="number"
                      className="table-input"
                      value={tableItem?.ok_nang || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "ok_nang")
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    {formatIndianNumber(tableItem.amount) || ""}
                  </div>
                </td>

                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      id={`${rowIndex}6`}
                      type="number"
                      className="table-input"
                      value={tableItem?.galaxy_nang || ""}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          rowIndex,
                          tableIndex,
                          "galaxy_nang"
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    {formatIndianNumber(tableItem.galaxy_total) || ""}
                  </div>
                </td>

                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      id={`${rowIndex}5`}
                      type="number"
                      className="table-input"
                      value={tableItem?.upad || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "upad")
                      }
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                    />
                  </div>
                </td>
                <td className="text-center">
                  {formatIndianNumber(tableItem.row_total || null)}
                </td>
                <td />
              </tr>
            );
          })}
          <tr className="text-center">
            <td>Total</td>
            <td />
            <td>{formatIndianNumber(nang)}</td>
            <td>{formatIndianNumber(weight)}</td>
            <td>{formatIndianNumber(two_Piece_total)}</td>
            <td>{formatIndianNumber(two_piece_total)}</td>
            <td>{formatIndianNumber(ok_nang)}</td>
            <td>{formatIndianNumber(ok_nang_total)}</td>
            <td>{formatIndianNumber(galaxy_nang_total)}</td>
            <td>{formatIndianNumber(galaxyTotal)}</td>
            <td>{formatIndianNumber(upad)}</td>
            <td>{formatIndianNumber(mainTotal)}</td>
            <td>
              <span className={tableTotalColor}>
                {formatIndianNumber(upad - mainTotal) || 0}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainTab;
