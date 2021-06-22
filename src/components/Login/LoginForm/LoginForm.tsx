import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../../common/FormControls/FormControls";
import { requiredField } from "../../../utils/validators/validators";
import classes from "../../common/FormControls/formControls.module.css";

export type LoginFormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = React.memo(
  (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            component={Input}
            name={"email"}
            placeholder={"Email"}
            validate={[requiredField]}
          />
        </div>
        <div>
          <Field
            component={Input}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            validate={[requiredField]}
          />
        </div>
        <div>
          <Field component={Input} name={"rememberMe"} type={"checkbox"} />
          Remember me
        </div>
        {props.error && (
          <div className={classes.formLevelError}>{props.error}</div>
        )}
        <div>
          <button>Log in</button>
        </div>
      </form>
    );
  }
);

export default reduxForm<LoginFormDataType>({ form: "loginForm" })(LoginForm);
