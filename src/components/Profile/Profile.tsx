import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { PostType } from "../../redux/state";

type ProfileStateType = {
  posts: Array<PostType>;
  newPostText: string;
};

type ProfilePropsType = {
  profilePageState: ProfileStateType;
  addPost: () => void;
  updateNewPostText: (inputPostText: string) => void;
};

export const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePageState.posts}
        newPostText={props.profilePageState.newPostText}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
      />
    </div>
  );
};
