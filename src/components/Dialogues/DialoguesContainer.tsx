import React from "react";
import { sendMessage } from "../../redux/dialogues/dialoguesReducer";
import { Dialogues } from "./Dialogues";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  selectDialogues,
  selectMessages,
} from "../../redux/dialogues/dialoguesSelectors";
// IMPORTS

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void;
};
export type DialoguesPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType) => ({
  messages: selectMessages(state),
  dialogues: selectDialogues(state),
});

export const DialoguesContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(
    mapStateToProps,
    { sendMessage }
  ),
  withAuthRedirect
)(Dialogues);
