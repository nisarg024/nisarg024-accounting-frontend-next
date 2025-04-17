import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import BtnLoader from "../../../../common/BtnLoader";
import {
  editClientMonthTable,
  editClientTablePrice,
} from "../../../../services/client/clientApi";

const PriceModal = ({
  show,
  tableData,
  setTableData,
  handleClose,
  singleTableData,
  handlePriceInputChange,
}) => {
  const { data, tableIndex } = singleTableData;

  const initialValues = {
    main_price: "" || data?.main_price,
    two_Piece_price: "" || data?.two_Piece_price,
    galaxy_price: "" || data?.galaxy_price,
  };

  const onSubmit = async (values) => {
    for (const key in values) {
      if (values[key] === "0" || values[key] === undefined) {
        values[key] = 1;
      }
    }

    const { _id } = tableData?.[tableIndex];
    const updatedData = tableData?.[tableIndex];

    const updatedTableData = JSON.parse(JSON.stringify(tableData));

    updatedTableData[tableIndex].tables = updatedTableData[
      tableIndex
    ].tables?.map((item) => {
      const amount = item?.ok_nang * updatedData?.main_price || 0;
      const two_Piece_total =
        item?.two_Piece * updatedData?.two_Piece_price || 0;
      const galaxy_total = item?.galaxy_nang * updatedData?.galaxy_price || 0; // Assuming `galaxy` is the correct field
      const row_total = amount + two_Piece_total + galaxy_total;

      return {
        ...item,
        amount,
        two_Piece_total,
        galaxy_total,
        row_total,
      };
    });

    await editClientMonthTable(_id, updatedTableData[tableIndex].tables);
    const apiRes = await editClientTablePrice(_id, values);
    if (apiRes?.success) {
      handleClose();
      setTableData(updatedTableData);
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={handleClose}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ errors, values, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Price</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <label htmlFor="Price" className="form-label">
                  2Piece Price
                </label>
                <Field
                  values={values?.two_Piece_price}
                  type="number"
                  className={`form-control ${
                    errors.two_Piece_price && "error"
                  }`}
                  name="two_Piece_price"
                  placeholder="Enter price"
                  onChange={(e) => {
                    setFieldValue("two_Piece_price", e.target.value);
                    handlePriceInputChange(
                      e,
                      singleTableData?.tableIndex,
                      "two_Piece_price"
                    );
                  }}
                />

                <label htmlFor="Price" className="form-label mt-3">
                  Ok Nang Price
                </label>
                <Field
                  values={values?.main_price}
                  type="number"
                  className={`form-control ${errors.main_price && "error"}`}
                  name="main_price"
                  placeholder="Enter price"
                  onChange={(e) => {
                    setFieldValue("main_price", e.target.value);
                    handlePriceInputChange(
                      e,
                      singleTableData?.tableIndex,
                      "main_price"
                    );
                  }}
                />

                <label htmlFor="Price" className="form-label mt-3">
                  Galaxy Price
                </label>
                <Field
                  values={values?.galaxy_price}
                  type="number"
                  className={`form-control`}
                  name="galaxy_price"
                  placeholder="Enter price"
                  onChange={(e) => {
                    setFieldValue("galaxy_price", e.target.value);
                    handlePriceInputChange(
                      e,
                      singleTableData?.tableIndex,
                      "galaxy_price"
                    );
                  }}
                />
              </>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={handleClose}>
                No
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? <BtnLoader /> : "Save"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PriceModal;
