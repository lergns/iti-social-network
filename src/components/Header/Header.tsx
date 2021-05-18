import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./Header.module.css";
import { AuthType } from "../../redux/authReducer";

type HeaderPropsType = {
  isAuth: boolean;
  login: string | null;
  setAuthUserData: (data: AuthType) => void;
};

export const Header = React.memo((props: HeaderPropsType) => {
  return (
    <header className={classes.header}>
      <img
        src={"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"}
        alt={"Logo"}
      />
      <div className={classes.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
});
