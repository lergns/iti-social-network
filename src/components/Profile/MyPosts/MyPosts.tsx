import React from "react";
import classes from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";
import AddPostForm, { AddPostFormDataType } from "./AddPostForm/AddPostForm";

export const MyPosts = React.memo(
  ({ posts, addPost, deletePost }: MyPostsPropsType) => {
    const postsElements = posts.map((post) => (
      <div key={post.id}>
        <Post
          postText={post.postText}
          likesCount={post.likesCount}
          id={post.id}
          deletePost={deletePost}
        />
      </div>
    ));

    const onPostAdding = (formData: AddPostFormDataType) => {
      addPost(formData.newPostText);
    };

    return (
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
        <AddPostForm onSubmit={onPostAdding} />
        <div className={classes.posts}>{postsElements}</div>
      </div>
    );
  }
);
