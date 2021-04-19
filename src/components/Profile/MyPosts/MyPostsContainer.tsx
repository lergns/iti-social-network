import React from "react";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profileReducer";
import { StoreContext } from "../../../redux/StoreContext";
import { MyPosts } from "./MyPosts";

export const MyPostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {(reduxStore) => {
        const profilePageState = reduxStore.getState().profilePage;

        const addPost = () => {
          reduxStore.dispatch(addPostAC());
        };

        const updateNewPostText = (inputPostText: string) => {
          reduxStore.dispatch(updateNewPostTextAC(inputPostText));
        };
        return (
          <MyPosts
            posts={profilePageState.posts}
            newPostText={profilePageState.newPostText}
            updateNewPostText={updateNewPostText}
            addPost={addPost}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};
