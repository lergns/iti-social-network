import React from "react";
import { Dialogues } from "./Dialogues";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  selectDialogues,
  selectMessages,
} from "../../redux/dialogues/dialoguesSelectors";
import { dialoguesActions } from "../../redux/dialogues/dialoguesReducer";
// IMPORTS

type MapStatePropsType = {
  messages: ReturnType<typeof selectMessages>;
  dialogues: ReturnType<typeof selectDialogues>;
};
type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void;
};
export type DialoguesPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  messages: selectMessages(state),
  dialogues: selectDialogues(state),
});

const DialoguesContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(
    mapStateToProps,
    { sendMessage: dialoguesActions.sendMessage }
  ),
  withAuthRedirect
)(Dialogues);

export default DialoguesContainer;
