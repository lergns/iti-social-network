import {
  DialogueItemType,
  MessageType,
  sendMessage,
  updateNewMessageText,
} from "../../redux/dialoguesReducer";
import { Dialogues } from "./Dialogues";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
// IMPORTS

type MapStatePropsType = {
  messages: Array<MessageType>;
  dialogues: Array<DialogueItemType>;
  newMessageText: string;
};
type MapDispatchPropsType = {
  updateNewMessageText: (newMessageText: string) => void;
  sendMessage: () => void;
};
export type DialoguesPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  messages: state.dialoguesPage.messages,
  dialogues: state.dialoguesPage.dialogues,
  newMessageText: state.dialoguesPage.newMessageText,
});

export const DialoguesContainer = connect(mapStateToProps, {
  updateNewMessageText,
  sendMessage,
})(Dialogues);
