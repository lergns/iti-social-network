import React from "react";
import classes from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { PostType } from "../../../redux/state";

export type MyPostsPropsType = {
  posts: Array<PostType>;
  addPost: (postText: string) => void; // callback passed all the way down from state.ts
};

export const MyPosts = (props: MyPostsPropsType) => {
  const postsElements = props.posts.map((post) => (
    <Post postText={post.postText} likesCount={post.likesCount} id={post.id} />
  ));

  const newPostRef = React.createRef<HTMLTextAreaElement>(); // creating variable, which stores a reference (typeof newPostElement === Object ! ) to a certain element from component's JSX; <HTMLTextAreaElement> - type of returned Ref Object

  const addNewPost = () => {
    if (newPostRef.current) {
      // if newPostRef points to smth (if it is already linked with smth) - checking if it's not === null !
      const postText: string = newPostRef.current.value; // .current - addresses native HTML element
      props.addPost(postText); // adding new post to state
      newPostRef.current.value = ""; // clearing the textarea after state update
    }
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostRef}></textarea>
          {/* linking newPostElement with a particular JSX element */}
        </div>
        <div>
          <button onClick={addNewPost}>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};
