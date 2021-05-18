import React from "react";
import classes from "./Message.module.css";
import { MessageType as MessagePropsType } from "../../../redux/dialoguesReducer";

export const Message = React.memo((props: MessagePropsType) => {
  return <div className={classes.message}>{props.messageText}</div>;
});
