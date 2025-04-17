import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import BtnLoader from "../../../../common/BtnLoader";
import { Dropdown } from "primereact/dropdown";
import { monthOrder, year } from "../../../../utils/dropdownValues";
import {
  clearFilterInfo,
  setFilterInfo,
} from "../../../../redux/common/commonSlice";
import { useDispatch, useSelector } from "react-redux";

const FilterModal = ({ show, handleClose, handleFilterApply }) => {
  const dispatch = useDispatch();
  const { filterInfo } = useSelector((state) => state.common);

  const initialValues = filterInfo || {
    month: "",
    year: "",
  };

  const onSubmit = async (values) => {
    await handleFilterApply(values);
    dispatch(setFilterInfo(values));
    handleClose();
  };

  return (
    <Modal size="md" centered show={show} onHide={handleClose}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
                Client Table Filter
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
              <Form>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Month
                  </label>
                  <Field
                    name="month"
                    as={Dropdown}
                    options={monthOrder}
                    placeholder="Select a Month"
                    className={`w-100`}
                  />
                  <ErrorMessage
                    name="month"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Year
                  </label>
                  <Field
                    name="year"
                    as={Dropdown}
                    options={year}
                    placeholder="Select a Year"
                    className={`w-100`}
                  />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="error-msg"
                  />
                </div>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => dispatch(clearFilterInfo({}))}
              >
                Clear filter
              </Button>
              <Button variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? <BtnLoader /> : "Apply"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default FilterModal;
