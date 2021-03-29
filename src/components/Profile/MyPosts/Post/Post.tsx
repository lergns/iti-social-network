import React from "react";
import classes from "./Post.module.css";
import { PostType as PostPropsType } from "../../../../redux/state";

export const Post = (props: PostPropsType) => {
  return (
    <div className={classes.item}>
      <img
        src={
          "https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/prototypen/w_sexy_gr.jpg"
        }
        alt={"person photo"}
      />
      {props.postText}
      <div>
        <span>{props.likesCount}</span>
      </div>
    </div>
  );
};
