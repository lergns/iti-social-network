import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./Header.module.css";

type HeaderPropsType = {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
};

export const Header = React.memo((props: HeaderPropsType) => {
  return (
    <header className={classes.header}>
      <img
        src={"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"}
        alt={"Logo"}
      />
      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Log in</NavLink>
        )}
      </div>
    </header>
  );
});
