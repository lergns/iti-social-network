import React from "react";
import LoginForm, { LoginFormDataType } from "./LoginForm/LoginForm";
import { LoginPropsType } from "./LoginContainer";
import { Redirect } from "react-router-dom";

export const Login = React.memo((props: LoginPropsType) => {
  const onSubmit = (formData: LoginFormDataType) =>
    props.login(formData.email, formData.password, formData.rememberMe);
  // props.login !== loginTC , connect()() from LoginContainer passed eponymous callback via props, which dispatches loginTC inside of itself !

  if (props.isAuth) return <Redirect to={"/profile"} />;
  else
    return (
      <div>
        <h1>Log in</h1>
        <LoginForm onSubmit={onSubmit} />
      </div>
    );
});
