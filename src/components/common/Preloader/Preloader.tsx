import React from "react";
import preloader from "../../../assets/images/preloader.gif";
import classes from "./Preloader.module.css";

export const Preloader = () => {
  return <img src={preloader} className={classes.preloader} alt={"Loading"} />;
};
