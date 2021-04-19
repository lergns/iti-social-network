import React from "react";
import classes from "./ProfileInfo.module.css";

export const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          src={"https://eskipaper.com/images/coastal-background-1.jpg"}
          alt={"background"}
        />
      </div>
      <div className={classes.descriptionBlock}>Ava + description</div>
    </div>
  );
};
