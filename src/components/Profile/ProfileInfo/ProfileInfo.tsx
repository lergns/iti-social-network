import React from "react";
import classes from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import { ProfileContacts } from "./ProfileContacts/ProfileContacts";
import { ProfilePhoto } from "./ProfilePhoto/ProfilePhoto";
import {
  selectStatus,
  selectUserProfile,
} from "../../../redux/profile/profileSelectors";

type ProfileInfoPropsType = {
  userProfile: ReturnType<typeof selectUserProfile>;
  status: ReturnType<typeof selectStatus>;
  updateProfileStatus: (status: string) => void;
  isProfileOwner: boolean;
  updateProfilePhoto: (photo: File) => void;
};

export const ProfileInfo = React.memo(
  ({
    userProfile,
    updateProfileStatus,
    status,
    isProfileOwner,
    updateProfilePhoto,
  }: ProfileInfoPropsType) => {
    if (!userProfile.userId) {
      return <Preloader />;
    } else
      return (
        <div>
          <div className={classes.descriptionBlock}>
            <ProfilePhoto
              updateProfilePhoto={updateProfilePhoto}
              isProfileOwner={isProfileOwner}
              profilePhoto={userProfile.photos.large}
            />
            <ProfileStatus
              status={status}
              updateProfileStatus={updateProfileStatus}
            />
            <ProfileContacts profileContacts={userProfile.contacts} />
          </div>
        </div>
      );
  }
);
