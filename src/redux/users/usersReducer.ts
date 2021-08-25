import { ResultCode, usersAPI, UserType } from "../../api/API";
import { RootThunkType } from "../redux-store";

type UsersInitialStateType = typeof usersInitialState;
export type UsersReducerActionTypes =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setIsFetching>
  | ReturnType<typeof setFollowingProgress>;
// TYPES

const usersInitialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

export const usersReducer = (
  usersState = usersInitialState,
  action: UsersReducerActionTypes
): UsersInitialStateType => {
  switch (action.type) {
    case "users/FOLLOW":
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.userID ? { ...user, followed: true } : user
        ), // also copying USER to be changed
      };

    case "users/UNFOLLOW":
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.userID ? { ...user, followed: false } : user
        ),
      };

    case "users/SET_USERS":
      return { ...usersState, users: action.users };

    case "users/SET_CURRENT_PAGE":
      return { ...usersState, currentPage: action.currentPage };

    case "users/SET_TOTAL_USERS_COUNT":
      return { ...usersState, totalUsersCount: action.totalUsersCount };

    case "users/SET_IS_FETCHING":
      return { ...usersState, isFetching: action.newIsFetching };

    case "users/SET_FOLLOWING_PROGRESS":
      return {
        ...usersState,
        followingInProgress: action.followingInProgress
          ? [...usersState.followingInProgress, action.userID]
          : usersState.followingInProgress.filter((id) => id !== action.userID),
      };

    default:
      return usersState;
  }
};
// REDUCER

export const followSuccess = (userID: number) =>
  ({
    type: "users/FOLLOW",
    userID,
  } as const);
export const unfollowSuccess = (userID: number) =>
  ({
    type: "users/UNFOLLOW",
    userID,
  } as const);
export const setUsers = (users: Array<UserType>) =>
  ({
    type: "users/SET_USERS",
    users,
  } as const);
export const setCurrentPage = (currentPage: number) =>
  ({
    type: "users/SET_CURRENT_PAGE",
    currentPage,
  } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({
    type: "users/SET_TOTAL_USERS_COUNT",
    totalUsersCount,
  } as const);
export const setIsFetching = (newIsFetching: boolean) =>
  ({
    type: "users/SET_IS_FETCHING",
    newIsFetching,
  } as const);
export const setFollowingProgress = (
  userID: number,
  followingInProgress: boolean
) =>
  ({
    type: "users/SET_FOLLOWING_PROGRESS",
    userID,
    followingInProgress,
  } as const);
// ACs

export const fetchUsers = (
  currentPageNumber: number,
  pageSize: number
): RootThunkType => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const res = await usersAPI.getUsers(currentPageNumber, pageSize);
    if (!res.error) {
      dispatch(setUsers(res.items));
      dispatch(setTotalUsersCount(res.totalCount));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
  dispatch(setIsFetching(false));
};
export const follow = (userID: number): RootThunkType => async (dispatch) => {
  dispatch(setFollowingProgress(userID, true));
  try {
    const res = await usersAPI.follow(userID);
    if (res.resultCode === ResultCode.Success) {
      dispatch(followSuccess(userID));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
  dispatch(setFollowingProgress(userID, false));
};
export const unfollow = (userID: number): RootThunkType => async (dispatch) => {
  dispatch(setFollowingProgress(userID, true));
  try {
    const res = await usersAPI.unfollow(userID);
    if (res.resultCode === ResultCode.Success) {
      dispatch(unfollowSuccess(userID));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
  dispatch(setFollowingProgress(userID, false));
};
// TCs
