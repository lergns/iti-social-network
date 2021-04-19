import React, { ChangeEvent } from "react";
import classes from "./MyPosts.module.css";
import { Post, PostPropsType as PostType } from "./Post/Post";

type MyPostsPropsType = {
  posts: Array<PostType>;
  newPostText: string;
  updateNewPostText: (inputPostText: string) => void;
  addPost: () => void;
};

export const MyPosts = (props: MyPostsPropsType) => {
  const postsElements = props.posts.map((post) => (
    <Post postText={post.postText} likesCount={post.likesCount} id={post.id} />
  ));

  const onPostAdding = () => {
    props.addPost();
  };

  const onPostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewPostText(event.currentTarget.value);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea value={props.newPostText} onChange={onPostChange} />
        </div>
        <div>
          <button onClick={onPostAdding}>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};
