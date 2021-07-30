import { profileAPI, ResultCode, UserProfileType } from "../api/API";
import { RootThunkType } from "./redux-store";

export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
type ProfileInitialStateType = typeof profileInitialState;
export type ProfileReducerActionTypes =
  | ReturnType<typeof addPost>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof setUserProfile>;
// TYPES

export const addPost = (newPostText: string) =>
  ({
    type: "ADD_POST",
    newPostText,
  } as const);
export const setUserProfile = (userProfile: UserProfileType) =>
  ({
    type: "SET_USER_PROFILE",
    userProfile,
  } as const);
export const setUserStatus = (status: string) =>
  ({
    type: "SET_USER_STATUS",
    status,
  } as const);
// ACs

export const getUserProfile = (userID: number): RootThunkType => (dispatch) => {
  profileAPI.getProfile(userID).then((res) => dispatch(setUserProfile(res)));
};
export const getUserStatus = (userID: number): RootThunkType => (dispatch) => {
  profileAPI.getStatus(userID).then((res) => dispatch(setUserStatus(res)));
};
export const updateUserStatus = (status: string): RootThunkType => (
  dispatch
) => {
  profileAPI.updateStatus(status).then((res) => {
    if (res.resultCode === ResultCode.Success) {
      dispatch(setUserStatus(status));
    }
  });
};
// TCs

const profileInitialState = {
  posts: [] as Array<PostType>,
  userProfile: {} as UserProfileType,
  status: "",
};

export const profileReducer = (
  profileState: ProfileInitialStateType = profileInitialState,
  action: ProfileReducerActionTypes
): ProfileInitialStateType => {
  switch (action.type) {
    case "ADD_POST": {
      const updatedState = { ...profileState, posts: [...profileState.posts] };
      const newPost = {
        id: updatedState.posts.length + 1,
        postText: action.newPostText,
        likesCount: 0,
      };
      return { ...updatedState, posts: [newPost, ...updatedState.posts] };
    }

    case "SET_USER_PROFILE":
      return { ...profileState, userProfile: action.userProfile };

    case "SET_USER_STATUS":
      return { ...profileState, status: action.status };

    default:
      return profileState;
  }
};
