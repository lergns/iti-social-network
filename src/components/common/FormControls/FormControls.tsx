import React, { FC } from "react";
import { WrappedFieldProps } from "redux-form";
import classes from "./formControls.module.css";

const FormControl: FC<WrappedFieldProps> = React.memo(({ meta, children }) => {
  const hasError: boolean = meta.touched && meta.error; // if Field was touched and there is an error ( validate[] )

  return (
    <div
      className={classes.formControl + " " + (hasError ? classes.error : "")}
    >
      <div>{children}</div>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
});

export const Textarea: FC<WrappedFieldProps> = React.memo((props) => {
  const { children, input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
});

export const Input: FC<WrappedFieldProps> = React.memo((props) => {
  const { children, input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
});
