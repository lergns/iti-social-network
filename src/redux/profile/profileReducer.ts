import { InferActionsType, RootThunkType } from "../store";
import { PhotosType, profileAPI, UserProfileType } from "../../api/profile-api";
import { ResultCode } from "../../api/api";

export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
export type ProfileInitialStateType = typeof profileInitialState;
type ProfileReducerActionsType = InferActionsType<typeof profileActions>;
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
  action: ProfileReducerActionsType
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

export const profileActions = {
  addPost: (newPostText: string) =>
    ({
      type: "profile/ADD_POST",
      payload: {
        newPostText,
      },
    } as const),
  deletePost: (postID: number) =>
    ({
      type: "profile/DELETE_POST",
      payload: {
        postID,
      },
    } as const),
  setUserProfile: (userProfile: UserProfileType) =>
    ({
      type: "profile/SET_USER_PROFILE",
      payload: {
        userProfile,
      },
    } as const),
  setProfileStatus: (status: string) =>
    ({
      type: "profile/SET_PROFILE_STATUS",
      payload: {
        status,
      },
    } as const),
  setProfilePhoto: (photos: PhotosType) =>
    ({
      type: "profile/SET_PROFILE_PHOTO",
      payload: {
        photos,
      },
    } as const),
};
// ACs

export const getUserProfile = (
  userID: number
): RootThunkType<ProfileReducerActionsType> => async (dispatch) => {
  try {
    const res = await profileAPI.getProfile(userID);
    dispatch(profileActions.setUserProfile(res));
  } catch (e) {
    console.warn(e);
  }
};
export const getProfileStatus = (
  userID: number
): RootThunkType<ProfileReducerActionsType> => async (dispatch) => {
  try {
    const res = await profileAPI.getStatus(userID);
    dispatch(profileActions.setProfileStatus(res));
  } catch (e) {
    console.warn(e);
  }
};
export const updateProfileStatus = (
  status: string
): RootThunkType<ProfileReducerActionsType> => async (dispatch) => {
  try {
    const res = await profileAPI.updateStatus(status);
    if (res.resultCode === ResultCode.Success) {
      dispatch(profileActions.setProfileStatus(status));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
};
export const updateProfilePhoto = (
  photo: File
): RootThunkType<ProfileReducerActionsType> => async (dispatch) => {
  try {
    const res = await profileAPI.updatePhoto(photo);
    if (res.resultCode === ResultCode.Success) {
      dispatch(profileActions.setProfilePhoto(res.data.photos));
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
