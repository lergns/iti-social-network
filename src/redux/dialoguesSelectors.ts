import { RootStateType } from "./redux-store";
import { DialogueItemType, MessageType } from "./dialoguesReducer";

export const selectMessages = (state: RootStateType): Array<MessageType> =>
  state.dialoguesPage.messages;
export const selectDialogues = (
  state: RootStateType
): Array<DialogueItemType> => state.dialoguesPage.dialogues;
