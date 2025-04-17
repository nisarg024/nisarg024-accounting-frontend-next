import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import {
  addJangadsAPi,
  jangadTableUpdate,
} from "../../../../../services/client/clientApi";
import {
  fetchJangads,
  refreshJangads,
} from "../../../../../redux/client/apiCalling";
import { useDispatch, useSelector } from "react-redux";
import TabelData from "../../../../../common/TabelData";
import BtnLoader from "../../../../../common/BtnLoader";
import SinglePageLoader from "../../../../../common/SinglePageLoader";
import { tableTotal } from "../../../../../utils/tabelTotal";
import { handleKeyDown } from "../../../../../utils/handleKeyDown";

const JangadTable = ({ id, show, handleClose }) => {
  const dispatch = useDispatch();
  const { JangadTable, JangadLoading } = useSelector((state) => state.client);
  const table_id = JangadTable?._id;
  const [tableData, setTableData] = useState(JangadTable || []);
  const [editSave, setEditSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addJangadLoading, setJangadLoading] = useState(false);

  const addJangads = async () => {
    setJangadLoading(true);
    const apiRes = await addJangadsAPi(id);
    if (apiRes?.success) {
      dispatch(refreshJangads(id));
      setJangadLoading(false);
    }
  };

  const handleInputChange = (event, tableIndex, field) => {
    setEditSave(true);
    const { value } = event.target;

    const updatedTableData = JSON.parse(JSON.stringify(tableData));
    const keyName = updatedTableData[tableIndex];

    keyName[field] = value || 0;

    setTableData(updatedTableData);
  };

  const saveTabel = async () => {
    setLoading(true);
    const apiRes = await jangadTableUpdate(table_id, tableData);
    if (apiRes?.success) {
      setLoading(false);
      handleClose();
    }
  };

  useEffect(() => {
    if (JangadTable) {
      setTableData(JangadTable?.tables);
    }
  }, [JangadTable]);

  useEffect(() => {
    dispatch(fetchJangads(id));
  }, [dispatch, id]);

  const cut_no = tableData?.length > 0 && tableTotal(tableData, "cut_no");
  const nang = tableData?.length > 0 && tableTotal(tableData, "nang");
  const wight = tableData?.length > 0 && tableTotal(tableData, "wight");

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "800px" }}
    >
      {JangadLoading ? (
        <SinglePageLoader />
      ) : (
        <>
          <Offcanvas.Header closeButton>
            <button
              disabled={addJangadLoading}
              type="button"
              className="btn btn-label-dark waves-effect w-20"
              onClick={() => addJangads()}
            >
              {addJangadLoading ? <BtnLoader /> : "Add Row +"}
            </button>
            <div className="position-absolute" style={{ right: "70px" }}>
              {editSave && (
                <button
                  disabled={loading}
                  onClick={(e) => {
                    e.stopPropagation();
                    saveTabel();
                  }}
                  type="button"
                  className="btn btn-outline-success waves-effect p-1"
                >
                  {loading ? (
                    <BtnLoader />
                  ) : (
                    <i className="ti ti-device-floppy" />
                  )}
                </button>
              )}
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr className="text-center">
                  <th>id</th>
                  <th className="text-nowrap">cut-no</th>
                  <th className="text-nowrap">nang</th>
                  <th className="text-nowrap">wight</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {tableData?.length > 0 ? (
                  <>
                    {tableData?.map((tableItem, tableIndex) => {
                      return (
                        <tr className="text-center">
                          <td>{tableItem?.index}</td>
                          <TabelData
                            id={`${tableIndex + 100}32`}
                            value={tableItem?.cut_no || ""}
                            onChange={(e) =>
                              handleInputChange(e, tableIndex, "cut_no")
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(e, tableIndex + 100, 32)
                            }
                          />
                          <TabelData
                            id={`${tableIndex + 100}33`}
                            value={tableItem?.nang || ""}
                            onChange={(e) =>
                              handleInputChange(e, tableIndex, "nang")
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(e, tableIndex + 100, 33)
                            }
                          />
                          <TabelData
                            id={`${tableIndex + 100}34`}
                            value={tableItem?.wight || ""}
                            onChange={(e) =>
                              handleInputChange(e, tableIndex, "wight")
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(e, tableIndex + 100, 34)
                            }
                          />
                        </tr>
                      );
                    })}
                    <tr className="text-center">
                      <td>Total</td>
                      <td>{cut_no}</td>
                      <td>{nang}</td>
                      <td>{wight}</td>
                    </tr>
                  </>
                ) : (
                  <tr className="text-center">
                    <td className="py-4" colSpan={4}>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Offcanvas.Body>
        </>
      )}
    </Offcanvas>
  );
};

export default JangadTable;
