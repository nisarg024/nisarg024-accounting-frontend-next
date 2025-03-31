"use client";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormInput from "@/common/FormInput";
import { addClient } from "@/services/client/clientApi";
import BtnLoader from "@/common/BtnLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddClient = (props) => {
  const query = useQueryClient();
  const { show, handleClose } = props;

  const apiCalling = (body) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/client`, {
      method: "POST",
      credentials: "include", // ✅ Required to send and receive cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => console.log("API Response:", data))
      .catch((error) => console.error("API Error:", error));
  };

  // const addClientMutation = useMutation({
  //   mutationFn: addClient,
  //   onSuccess: () => {
  //     query.invalidateQueries(["clients"]);
  //     handleClose();
  //   },
  // });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("required *"),
    lastName: Yup.string().required("required *"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    tableName: "",
  };

  // Form submission handler
  const onSubmit = async (values) => {
    const tables = [{ tableName: "Main" }, { tableName: "Galaxy" }].filter(
      (item) => item?.tableName !== ""
    );
    const body = {
      ...values,
      tables,
    };
    apiCalling(body);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Client</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <FormInput
                  label={"First Name"}
                  values={values.firstName}
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  errors={errors}
                  touched={touched}
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Last Name"
                  values={values.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  errors={errors}
                  touched={touched}
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

export default AddClient;
