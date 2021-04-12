import { ActionTypes, DialoguesPageType } from "./store";

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE"; // AC "type:" properties

// state from dialoguesReducer() parameter list === store.dialoguesPage
const dialoguesReducer = (state: DialoguesPageType, action: ActionTypes) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.inputMessageText;
      return state;
    case SEND_MESSAGE:
      state.messages.push({
        id: 6,
        messageText: state.newMessageText, // newMessageText is always up to date since it is updated via callback on each UI input change !
      }); // pushing new object with messageText: newMessageText property-value pair to messages array ( breaking immutability principle - will be refactored ! )
      state.newMessageText = ""; // clearing the value --> clearing the UI input field
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

export default dialoguesReducer;
