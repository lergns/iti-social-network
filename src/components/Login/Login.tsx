import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type FormDataType = {
  login: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={"input"} name={"login"} placeholder={"Login"} />
      </div>
      <div>
        <Field component={"input"} name={"password"} placeholder={"Password"} />
      </div>
      <div>
        <Field component={"input"} name={"rememberMe"} type={"checkbox"} />
        Remember me
      </div>
      <div>
        <button>Log in</button>
        {/* default behaviour of <button /> inside of <form /> === submitting form --> page reload */}
      </div>
    </form>
  );
};

// reduxForm()() === HOC: 1) prevents default form behaviour; 2) collects data from form fields and packs it into object; 3) passes handleSubmit via props into child component; 4) calls callback on form submit
const LoginReduxForm = reduxForm<FormDataType>({ form: "login" })(LoginForm);

export const Login = () => {
  const onSubmit = (formData: FormDataType) => {
    console.log(formData);
  };

  return (
    <div>
      <h1>Log in</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
