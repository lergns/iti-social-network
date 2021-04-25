/*
import {
  dialoguesReducer,
  DialoguesReducerActionTypes,
} from "./dialoguesReducer";
import { usersReducer, UsersReducerActionTypes } from "./usersReducer";

type StoreType = {
  _state: RootStateType;
  _callSubscriber: () => void;
  getState: () => RootStateType;
  subscribe: (observer: () => void) => void;
  dispatch: (action: ActionTypes) => void;
};
type RootStateType = {
  profilePage: ProfilePageType;
  dialoguesPage: DialoguesPageType;
};
type DialoguesPageType = {
  dialogues: Array<DialogueItemType>;
  messages: Array<MessageType>;
  newMessageText: string;
};
type DialogueItemType = {
  id: number;
  personName: string;
};
type MessageType = {
  id: number;
  messageText: string;
};
type ProfilePageType = {
  posts: Array<UserType>;
  newPostText: string;
};
type UserType = {
  id: number;
  postText: string;
  likesCount: number;
};
type ActionTypes = DialoguesReducerActionTypes & UsersReducerActionTypes;

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
  },
  _callSubscriber() {},

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = usersReducer(this._state.profilePage, action);
    this._state.dialoguesPage = dialoguesReducer(
      this._state.dialoguesPage,
      action
    );

    this._callSubscriber();
  },
};

export default store;
*/

export {};
