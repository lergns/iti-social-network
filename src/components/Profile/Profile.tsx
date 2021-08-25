import React from "react";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { UserProfileType } from "../../api/API";

type ProfilePropsType = {
  userProfile: UserProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
};

export const Profile = React.memo(
  ({ userProfile, updateUserStatus, status }: ProfilePropsType) => {
    return (
      <div>
        <ProfileInfo
          userProfile={userProfile}
          status={status}
          updateUserStatus={updateUserStatus}
        />
        <MyPostsContainer />
      </div>
    );
  }
);
