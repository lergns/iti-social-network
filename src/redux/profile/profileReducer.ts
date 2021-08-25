import { profileAPI, ResultCode, UserProfileType } from "../../api/API";
import { RootThunkType } from "../redux-store";

export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
export type ProfileInitialStateType = typeof profileInitialState;
export type ProfileReducerActionTypes =
  | ReturnType<typeof addPost>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof setUserProfile>;
// TYPES

const profileInitialState = {
  posts: [
    { id: 1, postText: "what's up?", likesCount: 3 },
    { id: 2, postText: "hey!", likesCount: 1 },
  ] as Array<PostType>,
  userProfile: {} as UserProfileType,
  status: "",
};

export const profileReducer = (
  profileState = profileInitialState,
  action: ProfileReducerActionTypes
): ProfileInitialStateType => {
  switch (action.type) {
    case "profile/ADD_POST": {
      const updatedState = { ...profileState, posts: [...profileState.posts] };
      const newPost = {
        id: updatedState.posts.length + 1,
        postText: action.newPostText,
        likesCount: 0,
      };
      return { ...updatedState, posts: [newPost, ...updatedState.posts] };
    }

    case "profile/DELETE_POST": {
      return {
        ...profileState,
        posts: profileState.posts.filter((post) => post.id !== action.postID),
      };
    }

    case "profile/SET_USER_PROFILE":
      return { ...profileState, userProfile: action.userProfile };

    case "profile/SET_USER_STATUS":
      return { ...profileState, status: action.status };

    default:
      return profileState;
  }
};
// REDUCER

export const addPost = (newPostText: string) =>
  ({
    type: "profile/ADD_POST",
    newPostText,
  } as const);
export const deletePost = (postID: number) =>
  ({
    type: "profile/DELETE_POST",
    postID,
  } as const);
export const setUserProfile = (userProfile: UserProfileType) =>
  ({
    type: "profile/SET_USER_PROFILE",
    userProfile,
  } as const);
export const setUserStatus = (status: string) =>
  ({
    type: "profile/SET_USER_STATUS",
    status,
  } as const);
// ACs

export const getUserProfile = (userID: number): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.getProfile(userID);
    dispatch(setUserProfile(res));
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
export const getUserStatus = (userID: number): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.getStatus(userID);
    dispatch(setUserStatus(res));
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
export const updateUserStatus = (status: string): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.updateStatus(status);
    if (res.resultCode === ResultCode.Success) {
      dispatch(setUserStatus(status));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
// TCs
