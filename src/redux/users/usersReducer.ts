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
          user.id === action.payload.userID ? { ...user, followed: true } : user
        ), // also copying USER to be changed
      };

    case "users/UNFOLLOW":
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.payload.userID
            ? { ...user, followed: false }
            : user
        ),
      };

    case "users/SET_USERS":
    case "users/SET_CURRENT_PAGE":
    case "users/SET_TOTAL_USERS_COUNT":
    case "users/SET_IS_FETCHING":
      return { ...usersState, ...action.payload }; // multiple cases with the same code block to execute

    case "users/SET_FOLLOWING_PROGRESS":
      return {
        ...usersState,
        followingInProgress: action.payload.followingInProgress
          ? [...usersState.followingInProgress, action.payload.userID]
          : usersState.followingInProgress.filter(
              (id) => id !== action.payload.userID
            ),
      };

    default:
      return usersState;
  }
};
// REDUCER

export const followSuccess = (userID: number) =>
  ({
    type: "users/FOLLOW",
    payload: {
      userID,
    },
  } as const);
export const unfollowSuccess = (userID: number) =>
  ({
    type: "users/UNFOLLOW",
    payload: {
      userID,
    },
  } as const);
export const setUsers = (users: Array<UserType>) =>
  ({
    type: "users/SET_USERS",
    payload: {
      users,
    },
  } as const);
export const setCurrentPage = (currentPage: number) =>
  ({
    type: "users/SET_CURRENT_PAGE",
    payload: {
      currentPage,
    },
  } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({
    type: "users/SET_TOTAL_USERS_COUNT",
    payload: {
      totalUsersCount,
    },
  } as const);
export const setIsFetching = (newIsFetching: boolean) =>
  ({
    type: "users/SET_IS_FETCHING",
    payload: {
      newIsFetching,
    },
  } as const);
export const setFollowingProgress = (
  userID: number,
  followingInProgress: boolean
) =>
  ({
    type: "users/SET_FOLLOWING_PROGRESS",
    payload: {
      userID,
      followingInProgress,
    },
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
    } else {
      const errMessage = res.error;
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
  dispatch(setIsFetching(false));
};
export const follow = (userID: number): RootThunkType => async (dispatch) => {
  dispatch(setFollowingProgress(userID, true));
  try {
    const res = await usersAPI.follow(userID);
    if (res.resultCode === ResultCode.Success) {
      dispatch(followSuccess(userID));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
  dispatch(setFollowingProgress(userID, false));
};
export const unfollow = (userID: number): RootThunkType => async (dispatch) => {
  dispatch(setFollowingProgress(userID, true));
  try {
    const res = await usersAPI.unfollow(userID);
    if (res.resultCode === ResultCode.Success) {
      dispatch(unfollowSuccess(userID));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
  dispatch(setFollowingProgress(userID, false));
};
// TCs
