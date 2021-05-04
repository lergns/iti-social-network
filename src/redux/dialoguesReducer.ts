export type DialogueItemType = {
  id: number;
  personName: string;
};
export type MessageType = {
  id: number;
  messageText: string;
};
type DialoguesInitialStateType = typeof dialoguesInitialState;
type DialoguesReducerActionTypes =
  | ReturnType<typeof updateNewMessageTextAC>
  | ReturnType<typeof sendMessageAC>;
// TYPES

export const updateNewMessageTextAC = (inputMessageText: string) =>
  ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    inputMessageText,
  } as const);
export const sendMessageAC = () =>
  ({
    type: SEND_MESSAGE,
  } as const);

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

const dialoguesInitialState = {
  dialogues: [
    { id: 1, personName: "Stacy" },
    { id: 2, personName: "Gracy" },
    { id: 3, personName: "Mike" },
    { id: 4, personName: "Sam" },
    { id: 5, personName: "Sanya" },
    { id: 6, personName: "Ladies" },
  ] as Array<DialogueItemType>,
  messages: [
    { id: 1, messageText: "Best man ever, top-class man!" },
    { id: 2, messageText: "Feed." },
    { id: 3, messageText: "I don't use public transport" },
    { id: 4, messageText: "Let's go get some buzz" },
    { id: 5, messageText: "$5,000/month is not enough, man..." },
  ] as Array<MessageType>,
  newMessageText: "",
};

export const dialoguesReducer = (
  dialoguesState: DialoguesInitialStateType = dialoguesInitialState,
  action: DialoguesReducerActionTypes
): DialoguesInitialStateType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return { ...dialoguesState, newMessageText: action.inputMessageText };

    case SEND_MESSAGE: {
      const updatedState = {
        ...dialoguesState,
        messages: [...dialoguesState.messages],
      };
      updatedState.messages.push({
        id: 6,
        messageText: updatedState.newMessageText,
      });
      updatedState.newMessageText = "";
      return updatedState;
    }

    default:
      return dialoguesState;
  }
};
