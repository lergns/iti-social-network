import React from "react";
import classes from "./Post.module.css";
import { PostType } from "../../../../redux/profile/profileReducer";

type PostPropsType = PostType & {
  deletePost: (postID: number) => void;
};

export const Post = React.memo(
  ({ deletePost, postText, likesCount, id }: PostPropsType) => {
    const onClickHandler = () => deletePost(id);

    return (
      <div className={classes.item}>
        <img
          src={
            "https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/prototypen/w_sexy_gr.jpg"
          }
          alt={"person"}
        />
        {postText}
        <div>
          <span>{likesCount}</span>
        </div>
        <button onClick={onClickHandler} className={classes.btn}>
          Delete post
        </button>
      </div>
    );
  }
);
