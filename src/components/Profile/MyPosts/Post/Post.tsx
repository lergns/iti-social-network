import React from "react";
import classes from "./Post.module.css";

export type PostPropsType = {
  id: number;
  postText: string;
  likesCount: number;
};

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
