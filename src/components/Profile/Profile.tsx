import React from "react";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { UserProfileType } from "../../api/API";

type ProfilePropsType = {
  userProfile: UserProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
};

export const Profile = React.memo((props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo
        userProfile={props.userProfile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer />
    </div>
  );
});
