import {
  DialogueItemType,
  MessageType,
  sendMessageAC,
  updateNewMessageTextAC,
} from "../../redux/dialoguesReducer";
import { Dialogues } from "./Dialogues";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    messages: state.dialoguesPage.messages,
    dialogues: state.dialoguesPage.dialogues,
    newMessageText: state.dialoguesPage.newMessageText,
  };
};
/* mapStateToProps(state) is called each time its input (state branch - messages/dialogues/newMessageText/etc.) is being changed --> new object with MapStatePropsType type is created --> the newly-created object's property-value pairs are compared to those of the object, formerly created by mapStateToProps(state) --> if there were changes to mapStateToProps(state)'s state branch, the component is being re-rendered */

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    updateNewMessageText: (newMessageText: string) => {
      dispatch(updateNewMessageTextAC(newMessageText));
    },
    sendMessage: () => {
      dispatch(sendMessageAC());
    },
  };
};

export const DialoguesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialogues);
/* connect() - returns callback, second () - calls that callback! ; connect(MAP STATE TO PROPS, MAP DISPATCH TO PROPS)(PRESENTATIONAL COMPONENT TO BE WRAPPED UP WITH CONTAINER COMPONENT) ; connect()() creates container component, which passes all props that are required by the presentational component and renders presentational component inside of itself (inside of that container component) ; connect()() has its own inner .subscribe(), which prevents re-rendering component if it didn't receive NEW object ( immutability principle ! ) as component's updated state ( mapStateToProps(state)'s output ) */
