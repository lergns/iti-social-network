import React, { ChangeEvent } from "react";
import classes from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { PostType } from "../../../redux/state";

export type MyPostsPropsType = {
  posts: Array<PostType>;
  newPostText: string;
  addPost: () => void;
  updateNewPostText: (inputPostText: string) => void;
};

export const MyPosts = (props: MyPostsPropsType) => {
  const postsElements = props.posts.map((post) => (
    <Post postText={post.postText} likesCount={post.likesCount} id={post.id} />
  ));

  const addNewPost = () => {
    props.addPost(); // logic encapsulated in state.ts file
  };

  const onPostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewPostText(event.currentTarget.value);
  }; // on input change, passing the input value (inputPostText) to newPostText (from the very state) as its value

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
