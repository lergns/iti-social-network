import { RootStateType } from "../store";
import { UserType } from "../../api/users-api";

export const selectUsers = (state: RootStateType): Array<UserType> =>
  state.usersPage.users;
export const selectPageSize = (state: RootStateType): number =>
  state.usersPage.pageSize;
export const selectTotalUsersCount = (state: RootStateType): number =>
  state.usersPage.totalUsersCount;
export const selectCurrentPageNumber = (state: RootStateType): number =>
  state.usersPage.currentPageNumber;
export const selectIsFetching = (state: RootStateType): boolean =>
  state.usersPage.isFetching;
export const selectFollowingInProgress = (
  state: RootStateType
): Array<number> => state.usersPage.followingInProgress;
