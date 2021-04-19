import React from "react";
import {
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialoguesReducer";
import { StoreContext } from "../../redux/StoreContext";
import { Dialogues } from "./Dialogues";

export const DialoguesContainer = () => {
  return (
    // return of <DialoguesContainer>
    <StoreContext.Consumer>
      {(reduxStore) => {
        const dialoguesPageState = reduxStore.getState().dialoguesPage;

        const updateNewMessageText = (newMessageText: string) => {
          reduxStore.dispatch(updateNewMessageTextAC(newMessageText));
        };
        const sendMessage = () => {
          reduxStore.dispatch(sendMessageAC());
        };
        return (
          // return of <StoreContext.Consumer>'s inner callback
          <Dialogues
            messages={dialoguesPageState.messages}
            dialogues={dialoguesPageState.dialogues}
            newMessageText={dialoguesPageState.newMessageText}
            updateNewMessageText={updateNewMessageText}
            sendMessage={sendMessage}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};
