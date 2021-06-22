import React from "react";
import classes from "./Dialogues.module.css";
import { DialogueItem } from "./DialogueItem/DialogueItem";
import { Message } from "./Message/Message";
import { DialoguesPropsType } from "./DialoguesContainer";
import AddMessageForm, {
  AddMessageFormDataType,
} from "./AddMessageForm/AddMessageForm";

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

  const addNewMessage = (formData: AddMessageFormDataType) => {
    props.sendMessage(formData.newMessageText);
  };

  return (
    <div className={classes.dialoguesPage}>
      <div className={classes.dialoguesList}>{dialogueElements}</div>
      <div className={classes.messagesList}>
        <div>{messageElements}</div>
        <AddMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
});
