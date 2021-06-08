import React, { ChangeEvent } from "react";
import classes from "./Dialogues.module.css";
import { DialogueItem } from "./DialogueItem/DialogueItem";
import { Message } from "./Message/Message";
import { DialoguesPropsType } from "./DialoguesContainer";

export const Dialogues = React.memo((props: DialoguesPropsType) => {
  const dialogueElements = props.dialogues.map((dialogue) => (
    <DialogueItem
      key={dialogue.id}
      personName={dialogue.personName}
      id={dialogue.id}
    />
  ));
  const messageElements = props.messages.map((message) => (
    <Message
      key={message.id}
      messageText={message.messageText}
      id={message.id}
    />
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
});
