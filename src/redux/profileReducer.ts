import { Dispatch } from "redux";
import { profileAPI } from "../api/API";

export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
type UserContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
type PhotosType = {
  small: string;
  large: string;
};
export type UserProfileType = {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UserContactsType;
  photos: PhotosType;
};
type ProfileInitialStateType = typeof profileInitialState;
type ProfileReducerActionTypes =
  | ReturnType<typeof addPost>
  | ReturnType<typeof updateNewPostText>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof setUserProfile>;
// TYPES

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

export const addPost = () =>
  ({
    type: ADD_POST,
  } as const);
export const updateNewPostText = (inputPostText: string) =>
  ({
    type: UPDATE_NEW_POST_TEXT,
    inputPostText,
  } as const);
export const setUserProfile = (userProfile: UserProfileType) =>
  ({
    type: SET_USER_PROFILE,
    userProfile,
  } as const);
export const setUserStatus = (status: string) =>
  ({
    type: SET_USER_STATUS,
    status,
  } as const);
// ACs

export const getUserProfile = (userID: number) => (dispatch: Dispatch) => {
  profileAPI.getProfile(userID).then((promise) => {
    dispatch(setUserProfile(promise.data));
  });
};
export const getUserStatus = (userID: number) => (dispatch: Dispatch) => {
  profileAPI.getStatus(userID).then((promise) => {
    dispatch(setUserStatus(promise.data));
  });
};
export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
  profileAPI.updateStatus(status).then((promise) => {
    if (promise.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  });
};
// TCs

const profileInitialState = {
  posts: [] as Array<PostType>,
  userProfile: {} as UserProfileType,
  newPostText: "",
  status: "",
};

export const profileReducer = (
  profileState: ProfileInitialStateType = profileInitialState,
  action: ProfileReducerActionTypes
): ProfileInitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const updatedState = { ...profileState, posts: [...profileState.posts] };
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
      return { ...profileState, newPostText: action.inputPostText };

    case SET_USER_PROFILE:
      return { ...profileState, userProfile: action.userProfile };

    case SET_USER_STATUS:
      return { ...profileState, status: action.status };

    default:
      return profileState;
  }
};
