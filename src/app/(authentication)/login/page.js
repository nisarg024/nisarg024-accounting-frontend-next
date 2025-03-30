"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SvgIcon from "./SvgIcon";
import Loader from "@/common/BtnLoader";
import { login } from "@/services/authentication/login";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const apiRes = await login(values);

    if (apiRes?.success) {
      router.push("/admin/client");
    } else {
      setErrors({ password: apiRes.message });
      setSubmitting(false);
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner py-4">
          {/* Login */}
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center mb-4 mt-2">
                <a className="app-brand-link gap-2">
                  <SvgIcon />
                  <span className="app-brand-text demo text-body fw-bold ms-1 pb-1">
                    Accounting
                  </span>
                </a>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <Field
                        type="text"
                        className={`form-control ${
                          errors.email && touched.email && "error"
                        }`}
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-msg"
                      />
                    </div>

                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div className="input-group input-group-merge">
                        <Field
                          type={`${show ? "text" : "password"}`}
                          id="password"
                          className={`form-control ${
                            errors.password && touched.password && "error"
                          }`}
                          name="password"
                          placeholder="············"
                        />
                        <span
                          onClick={() => setShow((prev) => !prev)}
                          className={`input-group-text cursor-pointer ${
                            errors.password && touched.password && "error mt-0"
                          }`}
                        >
                          <i
                            className={`ti ${show ? "ti-eye" : "ti-eye-off"} `}
                          />
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-msg"
                      />
                    </div>

                    <div className="mb-3">
                      <button
                        className="btn btn-primary d-grid w-100"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Loader /> : "Sign in"}
                      </button>
                    </div>

                    {/* Display server-side errors */}
                    <ErrorMessage
                      name="server"
                      component="div"
                      className="text-danger"
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* /Register */}
        </div>
      </div>
    </div>
  );
};

export default Login;
