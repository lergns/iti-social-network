import { RootStateType } from "../redux-store";
import { UserType } from "../../api/API";

export const selectUsers = (state: RootStateType): Array<UserType> =>
  state.usersPage.users;
export const selectPageSize = (state: RootStateType): number =>
  state.usersPage.pageSize;
export const selectTotalUsersCount = (state: RootStateType): number =>
  state.usersPage.totalUsersCount;
export const selectCurrentPage = (state: RootStateType): number =>
  state.usersPage.currentPage;
export const selectIsFetching = (state: RootStateType): boolean =>
  state.usersPage.isFetching;
export const selectFollowingInProgress = (
  state: RootStateType
): Array<number> => state.usersPage.followingInProgress;
