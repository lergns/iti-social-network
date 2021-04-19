import React from "react";
import classes from "./Message.module.css";

export type MessagePropsType = {
  id: number;
  messageText: string;
};

export const Message = (props: MessagePropsType) => {
  return <div className={classes.message}>{props.messageText}</div>;
};
