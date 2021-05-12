import React from "react";
import classes from "./ProfileInfo.module.css";
import { ProfilePropsType as ProfileInfoPropsType } from "../Profile";
import { Preloader } from "../../common/Preloader/Preloader";

export const ProfileInfo = (props: ProfileInfoPropsType) => {
  // checking if userProfile is not an empty object (with properties === undefined)
  if (!props.userProfile.userId) {
    return <Preloader />;
  } else
    return (
      <div>
        <div>
          <img
            src={"https://eskipaper.com/images/coastal-background-1.jpg"}
            alt={"background"}
          />
        </div>
        <div className={classes.descriptionBlock}>
          <div>Ava + description</div>
          <img src={props.userProfile.photos.large} alt={"user avatar"} />
        </div>
      </div>
    );
};
