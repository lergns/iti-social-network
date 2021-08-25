import React from "react";
import classes from "./DialogueItem.module.css";
import { NavLink } from "react-router-dom";
import { DialogueItemType as DialogueItemPropsType } from "../../../redux/dialogues/dialoguesReducer";

export const DialogueItem = React.memo(
  ({ personName, id }: DialogueItemPropsType) => {
    return (
      <div className={classes.dialogue}>
        <NavLink to={`/dialogues/${id}`}>{personName}</NavLink>
      </div>
    );
  }
);
