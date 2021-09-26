import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./Header.module.css";
import { HeaderPropsType } from "./HeaderContainer";

export const Header = React.memo(
  ({ isAuth, login, logout }: HeaderPropsType) => {
    return (
      <header className={classes.header}>
        <img
          src={"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"}
          alt={"Logo"}
        />
        <div className={classes.loginBlock}>
          {isAuth ? (
            <div>
              {login} -{" "}
              <button style={{ cursor: "pointer" }} onClick={logout}>
                Log out
              </button>
            </div>
          ) : (
            <NavLink to={"/login"}>Log in</NavLink>
          )}
        </div>
      </header>
    );
  }
);
