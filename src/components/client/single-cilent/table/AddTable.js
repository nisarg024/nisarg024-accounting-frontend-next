import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { useParams } from "react-router-dom";
import { monthOrder, year } from "../../../../utils/dropdownValues";
import BtnLoader from "../../../../common/BtnLoader";
import { addClientTable } from "../../../../services/client/clientApi";
import { fetchClientTable } from "../../../../redux/client/apiCalling";

const AddTable = (props) => {
  const { show, handleClose, active, tab_id } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    month: Yup.string().required("required *"),
    year: Yup.string().required("required *"),
  });

  const initialValues = {
    month: "",
    year: "",
  };

  // Form submission handler
  const onSubmit = async (values) => {
    const body = {
      month: values?.month,
      year: values?.year?.toString(),
      client_id: id,
      tab_id,
      tabName: active,
    };

    const data = await addClientTable(body);
    if (data?.success) {
      const body = { id, tabName: active };
      await dispatch(fetchClientTable(body));
      handleClose();
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Table</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
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
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <BtnLoader /> : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddTable;
