import React, { useRef } from "react";
import BtnLoader from "../../../../../common/BtnLoader";
import { tableTotal } from "../../../../../utils/tabelTotal";
import { formatIndianNumber } from "../../../../../utils/formatIndianNumber";

const GalaxyTab = ({
  item,
  loading,
  download,
  tableIndex,
  priceEditRow,
  handlePriceSave,
  handleInputChange,
  handlePriceEditClick,
  handlePriceInputChange,
}) => {
  const inputsRef = useRef([]);
  const og_active = tableTotal(item?.tables, "og_active");
  const multi = tableTotal(item?.tables, "multi");
  const Pie = tableTotal(item?.tables, "pie");
  const active = tableTotal(item?.tables, "active");
  const re_cut = tableTotal(item?.tables, "re_cut");
  const four_p = tableTotal(item?.tables, "four_p");
  const upad = tableTotal(item?.tables, "upad");
  const monthTotal = tableTotal(item?.tables, "galaxy_row_total");
  const mainTotal = (upad || 0) - (monthTotal || 0);

  const tableTotalColor =
    upad - monthTotal > 0 ? "text-success" : "text-danger";

  const handleKeyDown = (e, currentRow, currentCol) => {
    const rows = item?.tables?.length;
    const cols = 8;

    // Remove the 'focused' class from all inputs
    inputsRef.current.forEach((input) => {
      if (input) {
        input.classList.remove("focused");
      }
    });

    // Prevent the default action for arrow keys
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }

    let nextInput = null;

    // Determine the next input based on the pressed arrow key
    if (e.key === "ArrowDown" && currentRow < rows - 1) {
      nextInput = inputsRef.current[(currentRow + 1) * cols + currentCol];
    } else if (e.key === "ArrowUp" && currentRow > 0) {
      nextInput = inputsRef.current[(currentRow - 1) * cols + currentCol];
    } else if (e.key === "ArrowRight" && currentCol < cols - 1) {
      nextInput = inputsRef.current[currentRow * cols + (currentCol + 1)];
    } else if (e.key === "ArrowLeft" && currentCol > 0) {
      nextInput = inputsRef.current[currentRow * cols + (currentCol - 1)];
    }

    if (nextInput) {
      nextInput.focus();
      nextInput.classList.add("focused");
    }
  };

  return (
    <div className={`text-nowrap ${download ? "" : "table-responsive"}`}>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr className="text-center">
            <th>Date</th>
            <th className="text-nowrap">C.No</th>
            <th className="text-nowrap">OG Active</th>
            <th>OG(T)</th>
            <th>Multi</th>
            <th className="text-nowrap">M(T)</th>
            <th>Pie</th>
            <th>P(T)</th>
            <th>Active</th>
            <th>A(T)</th>
            <th>Re-cut</th>
            <th>R(T)</th>
            <th>4p</th>
            <th>4p(T)</th>
            <th>Upad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody className="table-border-bottom-0 text-center">
          <tr>
            <td>Price</td>
            <td />
            <td />
            <td
              className={`p-1 ${
                priceEditRow !== tableIndex ? "" : "bg-light-success"
              } `}
            >
              <div className="d-flex justify-content-center">
                <input
                  type="number"
                  className="table-input text-success"
                  disabled={priceEditRow !== tableIndex}
                  value={item?.og_active_price || ""}
                  onChange={(e) =>
                    handlePriceInputChange(e, tableIndex, "og_active_price")
                  }
                />
              </div>
            </td>
            <td />
            <td
              className={`p-1 ${
                priceEditRow !== tableIndex ? "" : "bg-light-success"
              } `}
            >
              <div className="d-flex justify-content-center ">
                <input
                  type="number"
                  className="table-input text-success"
                  value={item?.multi_price || ""}
                  disabled={priceEditRow !== tableIndex}
                  onChange={(e) =>
                    handlePriceInputChange(e, tableIndex, "multi_price")
                  }
                />
              </div>
            </td>
            <td />
            <td
              className={`p-1 ${
                priceEditRow !== tableIndex ? "" : "bg-light-success"
              } `}
            >
              <div className="d-flex justify-content-center ">
                <input
                  type="number"
                  className="table-input text-success"
                  value={item?.pie_price || ""}
                  onChange={(e) =>
                    handlePriceInputChange(e, tableIndex, "pie_price")
                  }
                  disabled={priceEditRow !== tableIndex}
                />
              </div>
            </td>
            <td />
            <td
              className={`p-1 ${
                priceEditRow !== tableIndex ? "" : "bg-light-success"
              } `}
            >
              <div className="d-flex justify-content-center ">
                <input
                  type="number"
                  className="table-input text-success"
                  value={item?.active_price || ""}
                  onChange={(e) =>
                    handlePriceInputChange(e, tableIndex, "active_price")
                  }
                  disabled={priceEditRow !== tableIndex}
                />
              </div>
            </td>
            <td />
            <td
              className={`p-1 ${
                priceEditRow !== tableIndex ? "" : "bg-light-success"
              } `}
            >
              <div className="d-flex justify-content-center ">
                <input
                  type="number"
                  className="table-input text-success"
                  value={item?.re_cut_price || ""}
                  onChange={(e) =>
                    handlePriceInputChange(e, tableIndex, "re_cut_price")
                  }
                  disabled={priceEditRow !== tableIndex}
                />
              </div>
            </td>
            <td />
            <td
              className={`p-1 ${
                priceEditRow !== tableIndex ? "" : "bg-light-success"
              } `}
            >
              <div className="d-flex justify-content-center ">
                <input
                  type="number"
                  className="table-input text-success"
                  value={item?.four_p_price || ""}
                  onChange={(e) =>
                    handlePriceInputChange(e, tableIndex, "four_p_price")
                  }
                />
              </div>
            </td>
            <td />
            <td />
            <td>
              {!download && (
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-success waves-effect p-1">
                    {priceEditRow !== tableIndex ? (
                      <i
                        className="ti ti-edit"
                        onClick={() => handlePriceEditClick(tableIndex)}
                      />
                    ) : (
                      <>
                        {loading ? (
                          <BtnLoader />
                        ) : (
                          <i
                            className="ti ti-device-floppy"
                            onClick={() => handlePriceSave(tableIndex)}
                          />
                        )}
                      </>
                    )}
                  </button>
                </div>
              )}
            </td>
          </tr>

          {item?.tables?.map((tableItem, rowIndex) => {
            return (
              <tr key={rowIndex}>
                <td>{tableItem?.date}</td>
                <td className="p-1">
                  <div className="d-flex justify-content-center ">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.cut_no || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "cut_no")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 0] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.og_active || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "og_active")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 1] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.og_active_total || "")}
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.multi || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "multi")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 2] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.multi_total || "")}
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.pie || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "pie")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 3] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 3)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.pie_total || "")}
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.active || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "active")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 4] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 4)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.active_total || "")}
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.re_cut || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "re_cut")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 5] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 5)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.re_cut_total || "")}
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.four_p || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "four_p")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 6] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 6)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.four_p_total || "")}
                </td>
                <td className="p-1">
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      className="table-input"
                      value={tableItem?.upad || ""}
                      onChange={(e) =>
                        handleInputChange(e, rowIndex, tableIndex, "upad")
                      }
                      ref={(el) => (inputsRef.current[rowIndex * 8 + 7] = el)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 7)}
                    />
                  </div>
                </td>
                <td className="p-1">
                  {formatIndianNumber(tableItem?.galaxy_row_total)}
                </td>
                <td />
              </tr>
            );
          })}
          <tr>
            <td>Total</td>
            <td />
            <td>{formatIndianNumber(og_active)}</td>
            <td>{formatIndianNumber(og_active * item?.og_active_price)}</td>
            <td>{formatIndianNumber(multi)}</td>
            <td>{formatIndianNumber(multi * item?.multi_price)}</td>
            <td>{formatIndianNumber(Pie)}</td>
            <td>{formatIndianNumber(Pie * item?.pie_price)}</td>
            <td>{formatIndianNumber(active)}</td>
            <td>{formatIndianNumber(active * item?.active_price)}</td>
            <td>{formatIndianNumber(re_cut)}</td>
            <td>{formatIndianNumber(re_cut * item?.re_cut_price)}</td>
            <td>{formatIndianNumber(four_p)}</td>
            <td>{formatIndianNumber(four_p * item?.four_p_price)}</td>
            <td>{formatIndianNumber(upad)}</td>

            <td>{formatIndianNumber(monthTotal)}</td>
            <td>
              <span className={tableTotalColor}>
                {formatIndianNumber(mainTotal) || 0}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GalaxyTab;
