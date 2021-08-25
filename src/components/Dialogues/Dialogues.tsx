import React from "react";
import classes from "./Dialogues.module.css";
import { DialogueItem } from "./DialogueItem/DialogueItem";
import { Message } from "./Message/Message";
import { DialoguesPropsType } from "./DialoguesContainer";

export const Dialogues = React.memo(
  ({ dialogues, messages }: DialoguesPropsType) => {
    const dialogueElements = dialogues.map((dialogue) => (
      <DialogueItem
        key={dialogue.id}
        personName={dialogue.personName}
        id={dialogue.id}
      />
    ));
    const messageElements = messages.map((message) => (
      <Message
        key={message.id}
        messageText={message.messageText}
        id={message.id}
      />
    ));

    /*const addNewMessage = (formData: AddMessageFormDataType) => {
    restProps.sendMessage(formData.newMessageText);
  };*/

    return (
      <div className={classes.dialoguesPage}>
        <div className={classes.dialoguesList}>{dialogueElements}</div>
        <div className={classes.messagesList}>
          <div>{messageElements}</div>
          {/*<AddMessageForm onSubmit={addNewMessage} />*/}
        </div>
      </div>
    );
  }
);
