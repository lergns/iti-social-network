import { RootStateType } from "../redux-store";
import { UserProfileType } from "../../api/API";
import { PostType } from "./profileReducer";

export const selectUserProfile = (state: RootStateType): UserProfileType =>
  state.profilePage.userProfile;
export const selectStatus = (state: RootStateType): string =>
  state.profilePage.status;
export const selectPosts = (state: RootStateType): Array<PostType> =>
  state.profilePage.posts;
