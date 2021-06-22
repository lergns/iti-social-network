import React from "react";
import classes from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import { UserProfileType } from "../../../api/API";

type ProfileInfoPropsType = {
  userProfile: UserProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
};

export const ProfileInfo = React.memo((props: ProfileInfoPropsType) => {
  if (!props.userProfile.userId) {
    return <Preloader />;
  } else
    return (
      <div>
        <div className={classes.descriptionBlock}>
          <img src={props.userProfile.photos.large} alt={"user avatar"} />
          <ProfileStatus
            status={props.status}
            updateUserStatus={props.updateUserStatus}
          />
        </div>
      </div>
    );
});
