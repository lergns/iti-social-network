import React from "react";
import classes from "./DialogueItem.module.css";
import { NavLink } from "react-router-dom";

export type DialogueItemPropsType = {
  id: number;
  personName: string;
};

export const DialogueItem = (props: DialogueItemPropsType) => {
  const path = `/dialogues/${props.id}`;
  return (
    <div className={classes.dialogue}>
      <NavLink to={path}>{props.personName}</NavLink>
    </div>
  );
};
