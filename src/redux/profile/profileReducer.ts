import {
  PhotosType,
  profileAPI,
  ResultCode,
  UserProfileType,
} from "../../api/API";
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
  | ReturnType<typeof setProfileStatus>
  | ReturnType<typeof setProfilePhoto>
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
        postText: action.payload.newPostText,
        likesCount: 0,
      };
      return { ...updatedState, posts: [newPost, ...updatedState.posts] };
    }

    case "profile/DELETE_POST": {
      return {
        ...profileState,
        posts: profileState.posts.filter(
          (post) => post.id !== action.payload.postID
        ),
      };
    }

    case "profile/SET_USER_PROFILE":
    case "profile/SET_PROFILE_STATUS":
      return { ...profileState, ...action.payload };

    case "profile/SET_PROFILE_PHOTO":
      return {
        ...profileState,
        userProfile: {
          ...profileState.userProfile,
          photos: action.payload.photos,
        },
      };

    default:
      return profileState;
  }
};
// REDUCER

export const addPost = (newPostText: string) =>
  ({
    type: "profile/ADD_POST",
    payload: {
      newPostText,
    },
  } as const);
export const deletePost = (postID: number) =>
  ({
    type: "profile/DELETE_POST",
    payload: {
      postID,
    },
  } as const);
export const setUserProfile = (userProfile: UserProfileType) =>
  ({
    type: "profile/SET_USER_PROFILE",
    payload: {
      userProfile,
    },
  } as const);
export const setProfileStatus = (status: string) =>
  ({
    type: "profile/SET_PROFILE_STATUS",
    payload: {
      status,
    },
  } as const);
export const setProfilePhoto = (photos: PhotosType) =>
  ({
    type: "profile/SET_PROFILE_PHOTO",
    payload: {
      photos,
    },
  } as const);
// ACs

export const getUserProfile = (userID: number): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.getProfile(userID);
    dispatch(setUserProfile(res));
  } catch (e) {
    console.warn(e);
  }
};
export const getProfileStatus = (userID: number): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.getStatus(userID);
    dispatch(setProfileStatus(res));
  } catch (e) {
    console.warn(e);
  }
};
export const updateProfileStatus = (status: string): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.updateStatus(status);
    if (res.resultCode === ResultCode.Success) {
      dispatch(setProfileStatus(status));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
};
export const updateProfilePhoto = (photo: File): RootThunkType => async (
  dispatch
) => {
  try {
    const res = await profileAPI.updatePhoto(photo);
    if (res.resultCode === ResultCode.Success) {
      dispatch(setProfilePhoto(res.data.photos));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
};
// TCs
