import React from "react";
import classes from "./Message.module.css";
import { MessageType as MessagePropsType } from "../../../redux/state";

export const Message = (props: MessagePropsType) => {
  return <div className={classes.message}>{props.messageText}</div>;
};
