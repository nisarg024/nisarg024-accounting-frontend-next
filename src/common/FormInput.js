import { ErrorMessage, Field } from "formik";
import React from "react";

const FormInput = ({
  values,
  name,
  label,
  type,
  placeholder,
  errors,
  touched,
  disabled,
}) => {
  const error = errors?.[name] && touched?.[name];
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        disabled={disabled}
        values={values}
        type={type}
        className={`form-control ${error && "error"}`}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="error-msg" />
    </>
  );
};

export default FormInput;
