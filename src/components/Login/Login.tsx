import React from "react";
import LoginForm, { LoginFormDataType } from "./LoginForm/LoginForm";
import { LoginPropsType } from "./LoginContainer";
import { Redirect } from "react-router-dom";

export const Login = React.memo(
  ({ login, isAuth, captchaURL }: LoginPropsType) => {
    const onSubmit = (formData: LoginFormDataType) =>
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      );

    if (isAuth) {
      return <Redirect to={"/profile"} />;
    } else
      return (
        <div>
          <h1>Log in</h1>
          <p>
            Email: free@samuraijs.com <br /> Password: free
          </p>
          <LoginForm onSubmit={onSubmit} captchaURL={captchaURL} />
        </div>
      );
  }
);
