import React from "react";
import classes from "./Message.module.css";
import { MessageType as MessagePropsType } from "../../../redux/dialogues/dialoguesReducer";

export const Message = React.memo(({ messageText }: MessagePropsType) => {
  return <div className={classes.message}>{messageText}</div>;
});
