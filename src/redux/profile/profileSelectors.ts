import { RootStateType } from "../store";
import { PostType } from "./profileReducer";
import { UserProfileType } from "../../api/profile-api";

export const selectUserProfile = (state: RootStateType): UserProfileType =>
  state.profilePage.userProfile;
export const selectStatus = (state: RootStateType): string =>
  state.profilePage.status;
export const selectPosts = (state: RootStateType): Array<PostType> =>
  state.profilePage.posts;
