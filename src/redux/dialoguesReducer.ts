export type DialogueItemType = {
  id: number;
  personName: string;
};
export type MessageType = {
  id: number;
  messageText: string;
};
type DialoguesInitialStateType = typeof dialoguesInitialState;
export type DialoguesReducerActionTypes = ReturnType<typeof sendMessage>;
// TYPES

export const sendMessage = (newMessageText: string) =>
  ({
    type: "SEND_MESSAGE",
    newMessageText,
  } as const);
// ACs

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
};

export const dialoguesReducer = (
  dialoguesState: DialoguesInitialStateType = dialoguesInitialState,
  action: DialoguesReducerActionTypes
): DialoguesInitialStateType => {
  switch (action.type) {
    case "SEND_MESSAGE": {
      const updatedState = {
        ...dialoguesState,
        messages: [...dialoguesState.messages],
      };
      updatedState.messages.push({
        id: updatedState.messages.length + 1,
        messageText: action.newMessageText,
      });
      return updatedState;
    }

    default:
      return dialoguesState;
  }
};
