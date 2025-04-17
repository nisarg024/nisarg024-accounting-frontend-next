import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import FormInput from "../../../../common/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BtnLoader from "../../../../common/BtnLoader";
import { editClient } from "../../../../services/client/clientApi";
import { refreshSingleClient } from "../../../../redux/client/apiCalling";

const EditProfile = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleClient } = useSelector((state) => state.client);
  const { data } = singleClient;
  const [edit, setEdit] = useState();

  const initialValues = data || {
    firstName: "",
    lastName: "",
  };

  const onSubmit = async (values) => {
    const apiRes = await editClient(id, { ...values });
    if (apiRes?.success) {
      await dispatch(refreshSingleClient(id));
      handleClose();
    }
  };

  return (
    <Modal size="md" centered show={show} onHide={handleClose}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ errors, touched, values, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
                Client Profile
                <i
                  className="ti ti-edit cursor-pointer ps-2"
                  onClick={() => setEdit(true)}
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <FormInput
                  disabled={!edit}
                  label={"First Name"}
                  values={values.firstName}
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-3">
                <FormInput
                  disabled={!edit}
                  label="Last Name"
                  values={values.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                />
              </div>
            </Modal.Body>
            {edit && (
              <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                  No
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? <BtnLoader /> : "Save"}
                </Button>
              </Modal.Footer>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProfile;
