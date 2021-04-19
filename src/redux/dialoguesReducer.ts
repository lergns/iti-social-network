import { ActionTypes } from "./redux-store";

type InitialDialoguesStateType = typeof initialDialoguesState;

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

const initialDialoguesState = {
  dialogues: [
    { id: 1, personName: "Stacy" },
    { id: 2, personName: "Gracy" },
    { id: 3, personName: "Mike" },
    { id: 4, personName: "Sam" },
    { id: 5, personName: "Sanya" },
    { id: 6, personName: "Ladies" },
  ],
  messages: [
    { id: 1, messageText: "Best man ever, top-class man!" },
    { id: 2, messageText: "Feed." },
    { id: 3, messageText: "I don't use public transport" },
    { id: 4, messageText: "Let's go get some buzz" },
    { id: 5, messageText: "$5,000/month is not enough, man..." },
  ],
  newMessageText: "",
}; // initial state that will be used as dialoguesReducer()'s state default parameter value (only if state wasn't passed into function) !

export const dialoguesReducer = (
  state: InitialDialoguesStateType = initialDialoguesState,
  action: ActionTypes
): InitialDialoguesStateType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.inputMessageText;
      return state;
    case SEND_MESSAGE:
      state.messages.push({
        id: 6,
        messageText: state.newMessageText,
      }); // pushing new object with messageText: newMessageText property-value pair to messages array ( breaking immutability principle - will be refactored ! )
      state.newMessageText = "";
      return state;
    default:
      return state;
  }
};

export const updateNewMessageTextAC = (inputMessageText: string) =>
  ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    inputMessageText,
  } as const);
export const sendMessageAC = () =>
  ({
    type: SEND_MESSAGE,
  } as const);
