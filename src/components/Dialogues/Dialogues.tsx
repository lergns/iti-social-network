import React, { ChangeEvent } from "react";
import classes from "./Dialogues.module.css";
import {
  DialogueItem,
  DialogueItemPropsType as DialogueItemType,
} from "./DialogueItem/DialogueItem";
import { Message, MessagePropsType as MessageType } from "./Message/Message";

type DialoguesPropsType = {
  messages: Array<MessageType>;
  dialogues: Array<DialogueItemType>;
  newMessageText: string;
  updateNewMessageText: (newMessageText: string) => void;
  sendMessage: () => void;
};

export const Dialogues = (props: DialoguesPropsType) => {
  const dialogueElements = props.dialogues.map((dialogue) => (
    <DialogueItem personName={dialogue.personName} id={dialogue.id} />
  ));
  const messageElements = props.messages.map((message) => (
    <Message messageText={message.messageText} id={message.id} />
  ));

  const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewMessageText(event.currentTarget.value);
  };

  const onMessageSending = () => {
    props.sendMessage();
  };

  return (
    <div className={classes.dialoguesPage}>
      <div className={classes.dialoguesList}>{dialogueElements}</div>
      <div className={classes.messagesList}>
        <div>{messageElements}</div>
        <div>
          <div>
            <textarea
              value={props.newMessageText}
              onChange={onMessageChange}
              placeholder={"Enter your message"}
            />
          </div>
          <div>
            <button onClick={onMessageSending}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
