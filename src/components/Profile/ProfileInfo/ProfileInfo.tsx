import React from "react";
import classes from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { UserProfileType } from "../../../redux/profileReducer";

type ProfileInfoPropsType = {
  userProfile: UserProfileType;
};

export const ProfileInfo = React.memo((props: ProfileInfoPropsType) => {
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
});
