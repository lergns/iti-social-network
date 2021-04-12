import React, { ChangeEvent } from "react";
import classes from "./Dialogues.module.css";
import { DialogueItem } from "./DialogueItem/DialogueItem";
import { Message } from "./Message/Message";
import { ActionTypes, DialogueItemType, MessageType } from "../../redux/store";
import {
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialoguesReducer";

type DialoguesPageStateType = {
  messages: Array<MessageType>;
  dialogues: Array<DialogueItemType>;
  newMessageText: string;
};

type DialoguesPropsType = {
  dialoguesPageState: DialoguesPageStateType;
  dispatch: (action: ActionTypes) => void;
};

export const Dialogues = (props: DialoguesPropsType) => {
  const dialogueElements = props.dialoguesPageState.dialogues.map(
    (dialogue) => (
      <DialogueItem personName={dialogue.personName} id={dialogue.id} />
    )
  );
  const messageElements = props.dialoguesPageState.messages.map((message) => (
    <Message messageText={message.messageText} id={message.id} />
  ));

  const changeNewMessageText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.dispatch(updateNewMessageTextAC(event.currentTarget.value)); // dispatching action object (which received its input parameter from event directly), returned by AC function
  };
  const sendMessage = () => {
    props.dispatch(sendMessageAC());
  };

  return (
    <div className={classes.dialoguesPage}>
      <div className={classes.dialoguesList}>{dialogueElements}</div>
      <div className={classes.messagesList}>
        <div>{messageElements}</div>
        <div>
          <div>
            <textarea
              value={props.dialoguesPageState.newMessageText}
              onChange={changeNewMessageText}
              placeholder={"Enter your message"}
            />
          </div>
          <div>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
