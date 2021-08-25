import React from "react";
import classes from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { UserProfileType } from "../../../api/API";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";

type ProfileInfoPropsType = {
  userProfile: UserProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
};

export const ProfileInfo = React.memo(
  ({ userProfile, updateUserStatus, status }: ProfileInfoPropsType) => {
    if (!userProfile.userId) {
      return <Preloader />;
    } else
      return (
        <div>
          <div className={classes.descriptionBlock}>
            <img src={userProfile.photos.large} alt={"User"} />
            <ProfileStatus
              status={status}
              updateUserStatus={updateUserStatus}
            />
          </div>
        </div>
      );
  }
);
