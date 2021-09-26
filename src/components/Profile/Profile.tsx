import React from "react";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import {
  selectStatus,
  selectUserProfile,
} from "../../redux/profile/profileSelectors";

type ProfilePropsType = {
  userProfile: ReturnType<typeof selectUserProfile>;
  status: ReturnType<typeof selectStatus>;
  updateProfileStatus: (status: string) => void;
  isProfileOwner: boolean;
  updateProfilePhoto: (photo: File) => void;
};

export const Profile = React.memo(
  ({
    userProfile,
    updateProfileStatus,
    status,
    isProfileOwner,
    updateProfilePhoto,
  }: ProfilePropsType) => {
    return (
      <div>
        <ProfileInfo
          userProfile={userProfile}
          status={status}
          updateProfileStatus={updateProfileStatus}
          isProfileOwner={isProfileOwner}
          updateProfilePhoto={updateProfilePhoto}
        />
        <MyPostsContainer />
      </div>
    );
  }
);
