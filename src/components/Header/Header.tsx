import React from "react";
import classes from "./Header.module.css";

export const Header = () => {
  return (
    <header className={classes.header}>
      <img
        src={"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"}
        alt={"Logo"}
      />
    </header>
  );
};
