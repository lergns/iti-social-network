import React from "react";
import classes from "./Message.module.css";
import { MessageType as MessagePropsType } from "../../../redux/store";

export const Message = (props: MessagePropsType) => {
  return <div className={classes.message}>{props.messageText}</div>;
};
