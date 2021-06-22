import React from "react";
import classes from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";
import AddPostForm, { AddPostFormDataType } from "./AddPostForm/AddPostForm";

export const MyPosts = React.memo((props: MyPostsPropsType) => {
  const postsElements = props.posts.map((post) => (
    <Post
      key={post.id}
      postText={post.postText}
      likesCount={post.likesCount}
      id={post.id}
    />
  ));

  const onPostAdding = (formData: AddPostFormDataType) => {
    props.addPost(formData.newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddPostForm onSubmit={onPostAdding} />
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
});
