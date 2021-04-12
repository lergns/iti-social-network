import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { ActionTypes, PostType } from "../../redux/store";

type ProfilePageStateType = {
  posts: Array<PostType>;
  newPostText: string;
};

type ProfilePropsType = {
  profilePageState: ProfilePageStateType;
  dispatch: (action: ActionTypes) => void;
};

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePageState.posts}
        newPostText={props.profilePageState.newPostText}
        dispatch={props.dispatch}
      />
    </div>
  );
};
