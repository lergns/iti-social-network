import React from "react";
import classes from "./Dialogues.module.css";
import { DialogueItem } from "./DialogueItem/DialogueItem";
import { Message } from "./Message/Message";
import { DialogueItemType, MessageType } from "../../redux/state";

type DialoguesStateType = {
  messages: Array<MessageType>;
  dialogues: Array<DialogueItemType>;
};

type DialoguesPropsType = {
  state: DialoguesStateType;
};

export const Dialogues = (props: DialoguesPropsType) => {
  const dialoguesElements = props.state.dialogues.map((dialogue) => (
    <DialogueItem personName={dialogue.personName} id={dialogue.id} />
  ));
  const messagesElements = props.state.messages.map((message) => (
    <Message messageText={message.messageText} id={message.id} />
  ));

  return (
    <div className={classes.dialoguesPage}>
      <div className={classes.dialoguesList}>{dialoguesElements}</div>
      <div className={classes.messagesList}>{messagesElements}</div>
    </div>
  );
};
