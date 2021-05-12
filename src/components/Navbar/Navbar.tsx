import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to={"/profile"} activeClassName={classes.active}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/dialogues"} activeClassName={classes.active}>
          Dialogues
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/users"} activeClassName={classes.active}>
          Users
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/news"} activeClassName={classes.active}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/music"} activeClassName={classes.active}>
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/settings"} activeClassName={classes.active}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};
