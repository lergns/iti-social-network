import React, { ChangeEvent } from "react";
import classes from "./ProfilePhoto.module.css";
import userAva from "../../../../assets/images/userAva.png";

type ProfilePhotoPropsType = {
  profilePhoto?: string;
  isProfileOwner: boolean;
  updateProfilePhoto: (photo: File) => void;
};

export const ProfilePhoto = React.memo(
  ({
    isProfileOwner,
    profilePhoto,
    updateProfilePhoto,
  }: ProfilePhotoPropsType) => {
    const onUserPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
      event.target.files &&
        event.target.files.length &&
        updateProfilePhoto(event.target.files[0]);
    };

    return (
      <div>
        <img
          className={classes.userPhoto}
          src={profilePhoto || userAva}
          alt={"User"}
        />
        {isProfileOwner && (
          <input
            type={"file"}
            onChange={onUserPhotoSelected}
            className={classes.setUserPhoto}
          />
        )}
      </div>
    );
  }
);
