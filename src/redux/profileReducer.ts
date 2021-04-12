import { ActionTypes, PostType, ProfilePageType } from "./store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"; // storing repeatable string values as const's

// state from profileReducer() parameter list === store.profilePage
const profileReducer = (state: ProfilePageType, action: ActionTypes) => {
  switch (action.type) {
    case ADD_POST:
      // former .addPost() method
      const newPost: PostType = {
        id: 4,
        postText: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state; // return statement prevents case fallthrough --> no need of break statement !
    case UPDATE_NEW_POST_TEXT:
      // former .updateNewPostText() method
      state.newPostText = action.inputPostText;
      return state;
    default:
      // if received action is of neither type:
      return state;
  }
};

export const addPostAC = () =>
  ({
    type: ADD_POST,
  } as const); // AC === "action creator" functions; as const - helps TS create types from return values of functions (in type ActionTypes)
export const updateNewPostTextAC = (inputPostText: string) =>
  ({
    type: UPDATE_NEW_POST_TEXT,
    inputPostText,
  } as const); // AC functions

export default profileReducer;
