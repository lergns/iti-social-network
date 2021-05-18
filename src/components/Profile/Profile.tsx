import React from "react";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { UserProfileType } from "../../redux/profileReducer";

export type ProfilePropsType = {
  userProfile: UserProfileType;
};

export const Profile = React.memo((props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo userProfile={props.userProfile} />
      <MyPostsContainer />
    </div>
  );
});
