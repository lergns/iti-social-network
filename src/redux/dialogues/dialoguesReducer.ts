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

const dialoguesInitialState = {
  dialogues: [
    { id: 1, personName: "Stacy" },
    { id: 2, personName: "Gracy" },
    { id: 3, personName: "Mike" },
    { id: 4, personName: "Sam" },
    { id: 5, personName: "Sanya" },
  ] as Array<DialogueItemType>,
  messages: [
    { id: 1, messageText: "Hola!" },
    { id: 2, messageText: "Meow" },
    { id: 3, messageText: "What's up?" },
    { id: 4, messageText: "Where have you been?" },
    { id: 5, messageText: "See you soon!" },
  ] as Array<MessageType>,
};

export const dialoguesReducer = (
  dialoguesState = dialoguesInitialState,
  action: DialoguesReducerActionTypes
): DialoguesInitialStateType => {
  switch (action.type) {
    case "dialogues/SEND_MESSAGE": {
      const updatedState = {
        ...dialoguesState,
        messages: [...dialoguesState.messages],
      };
      updatedState.messages.push({
        id: updatedState.messages.length + 1,
        messageText: action.payload.newMessageText,
      });
      return updatedState;
    }

    default:
      return dialoguesState;
  }
};
// REDUCER

export const sendMessage = (newMessageText: string) =>
  ({
    type: "dialogues/SEND_MESSAGE",
    payload: {
      newMessageText,
    },
  } as const);
// ACs
