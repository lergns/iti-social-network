export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
type ProfileInitialStateType = typeof profileInitialState;
type ProfileReducerActionTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>;
// TYPES

export const addPostAC = () =>
  ({
    type: ADD_POST,
  } as const);
export const updateNewPostTextAC = (inputPostText: string) =>
  ({
    type: UPDATE_NEW_POST_TEXT,
    inputPostText,
  } as const);

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const profileInitialState = {
  posts: [
    { id: 1, postText: "It's my first post!", likesCount: 11 },
    { id: 2, postText: "How are you, guys?", likesCount: 8 },
    {
      id: 3,
      postText: "This social network is so cool!!!!",
      likesCount: 2,
    },
  ] as Array<PostType>,
  newPostText: "",
};

export const profileReducer = (
  state: ProfileInitialStateType = profileInitialState,
  action: ProfileReducerActionTypes
): ProfileInitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const updatedState = { ...state, posts: [...state.posts] };
      const newPost = {
        id: 4,
        postText: updatedState.newPostText,
        likesCount: 0,
      };
      updatedState.posts.push(newPost);
      updatedState.newPostText = "";
      return updatedState;
    }

    case UPDATE_NEW_POST_TEXT:
      return { ...state, newPostText: action.inputPostText };

    default:
      return state;
  }
};
