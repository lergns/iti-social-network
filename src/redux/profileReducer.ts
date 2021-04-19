import { ActionTypes } from "./redux-store";

type InitialProfileStateType = typeof initialProfileState;

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialProfileState = {
  posts: [
    { id: 1, postText: "It's my first post!", likesCount: 11 },
    { id: 2, postText: "How are you, guys?", likesCount: 8 },
    {
      id: 3,
      postText: "This social network is so cool!!!!",
      likesCount: 2,
    },
  ],
  newPostText: "",
};

export const profileReducer = (
  state: InitialProfileStateType = initialProfileState,
  action: ActionTypes
): InitialProfileStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 4,
        postText: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.inputPostText;
      return state;
    default:
      return state;
  }
};

export const addPostAC = () =>
  ({
    type: ADD_POST,
  } as const);
export const updateNewPostTextAC = (inputPostText: string) =>
  ({
    type: UPDATE_NEW_POST_TEXT,
    inputPostText,
  } as const);
