import profileReducer, {
  addPostAC,
  updateNewPostTextAC,
} from "./profileReducer";
import dialoguesReducer, {
  sendMessageAC,
  updateNewMessageTextAC,
} from "./dialoguesReducer";

export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
export type ProfilePageType = {
  posts: Array<PostType>;
  newPostText: string;
};
export type DialogueItemType = {
  id: number;
  personName: string;
};
export type MessageType = {
  id: number;
  messageText: string;
};
export type DialoguesPageType = {
  dialogues: Array<DialogueItemType>;
  messages: Array<MessageType>;
  newMessageText: string;
};
export type RootStateType = {
  profilePage: ProfilePageType;
  dialoguesPage: DialoguesPageType;
};
export type StoreType = {
  _state: RootStateType;
  _callSubscriber: () => void;
  getState: () => RootStateType;
  subscribe: (observer: () => void) => void; // setting type for HOF in one line
  dispatch: (action: ActionTypes) => void; // .dispatch()'s input action object can be of either type
};
export type ActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof updateNewMessageTextAC>
  | ReturnType<typeof sendMessageAC>; // storing all possible actions' types in one type - to avoid huge typing in components' props; TS will automatically create types from return values of AC functions !
// TYPES

const store: StoreType = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, postText: "It's my first post!", likesCount: 11 },
        { id: 2, postText: "How are you, guys?", likesCount: 8 },
        {
          id: 3,
          postText: "That social network is so cool!!!!",
          likesCount: 2,
        },
      ],
      newPostText: "",
    },
    dialoguesPage: {
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
    },
  }, // _PROPERTY - private properties (can only be addressed from inside the store object via .this keyword)
  _callSubscriber() {}, // former onChangeReRenderApp()

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action); // passing different state parts, but same action !
    this._state.dialoguesPage = dialoguesReducer(
      this._state.dialoguesPage,
      action
    ); // mutating _state - to be refactored !

    this._callSubscriber();
  },
};

export default store;
