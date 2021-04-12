import React, { ChangeEvent } from "react";
import classes from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { ActionTypes, PostType } from "../../../redux/store";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profileReducer";

export type MyPostsPropsType = {
  posts: Array<PostType>;
  newPostText: string;
  dispatch: (action: ActionTypes) => void;
};

export const MyPosts = (props: MyPostsPropsType) => {
  const postsElements = props.posts.map((post) => (
    <Post postText={post.postText} likesCount={post.likesCount} id={post.id} />
  ));

  const addNewPost = () => {
    props.dispatch(addPostAC()); // actually calling store's method as callback - if not for the .bind(), .addPost()'s ( before .dispatch() ) .this keyword would've been === props: MyPostsPropsType !
  };

  const onPostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.dispatch(updateNewPostTextAC(event.currentTarget.value)); // passing value from UI input into store's dispatch() via callbacks' chain
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea value={props.newPostText} onChange={onPostChange} />
        </div>
        <div>
          <button onClick={addNewPost}>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};
