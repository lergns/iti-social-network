import React from "react";
import {
  DialogueItemType,
  MessageType,
  sendMessage,
} from "../../redux/dialoguesReducer";
import { Dialogues } from "./Dialogues";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
// IMPORTS

type MapStatePropsType = {
  messages: Array<MessageType>;
  dialogues: Array<DialogueItemType>;
};
type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void;
};
export type DialoguesPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  messages: state.dialoguesPage.messages,
  dialogues: state.dialoguesPage.dialogues,
});

export const DialoguesContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(
    mapStateToProps,
    { sendMessage }
  ),
  withAuthRedirect
)(Dialogues);
