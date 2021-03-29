import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { PostType } from "../../redux/state";

type ProfileStateType = {
  posts: Array<PostType>;
};

type ProfilePropsType = {
  state: ProfileStateType;
  addPost: (postText: string) => void;
};

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} addPost={props.addPost} />
    </div>
  );
};
