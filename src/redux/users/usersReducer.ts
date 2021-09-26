import { ResultCode } from "../../api/api";
import { InferActionsType, RootThunkType } from "../store";
import { usersAPI, UserType } from "../../api/users-api";

type UsersInitialStateType = typeof usersInitialState;
export type UsersReducerActionsType = InferActionsType<typeof usersActions>;
// TYPES

const usersInitialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPageNumber: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of user ids'
};

export const usersReducer = (
  usersState = usersInitialState,
  action: UsersReducerActionsType
): UsersInitialStateType => {
  switch (action.type) {
    case "users/FOLLOW_SUCCESS":
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.payload.userID ? { ...user, followed: true } : user
        ), // also copying USER to be changed
      };

    case "users/UNFOLLOW_SUCCESS":
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.payload.userID
            ? { ...user, followed: false }
            : user
        ),
      };

    case "users/SET_USERS":
    case "users/SET_CURRENT_PAGE_NUMBER":
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

export const usersActions = {
  followSuccess: (userID: number) =>
    ({
      type: "users/FOLLOW_SUCCESS",
      payload: {
        userID,
      },
    } as const),
  unfollowSuccess: (userID: number) =>
    ({
      type: "users/UNFOLLOW_SUCCESS",
      payload: {
        userID,
      },
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: "users/SET_USERS",
      payload: {
        users,
      },
    } as const),
  setCurrentPageNumber: (currentPageNumber: number) =>
    ({
      type: "users/SET_CURRENT_PAGE_NUMBER",
      payload: {
        currentPageNumber,
      },
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "users/SET_TOTAL_USERS_COUNT",
      payload: {
        totalUsersCount,
      },
    } as const),
  setIsFetching: (newIsFetching: boolean) =>
    ({
      type: "users/SET_IS_FETCHING",
      payload: {
        newIsFetching,
      },
    } as const),
  setFollowingProgress: (userID: number, followingInProgress: boolean) =>
    ({
      type: "users/SET_FOLLOWING_PROGRESS",
      payload: {
        userID,
        followingInProgress,
      },
    } as const),
};
// ACs

export const fetchUsers = (
  currentPageNumber: number,
  pageSize: number
): RootThunkType<UsersReducerActionsType> => async (dispatch) => {
  dispatch(usersActions.setIsFetching(true));
  try {
    const res = await usersAPI.getUsers(currentPageNumber, pageSize);
    if (!res.error) {
      dispatch(usersActions.setUsers(res.items));
      dispatch(usersActions.setTotalUsersCount(res.totalCount));
    } else {
      const errMessage = res.error;
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
  dispatch(usersActions.setIsFetching(false));
};
export const follow = (
  userID: number
): RootThunkType<UsersReducerActionsType> => async (dispatch) => {
  dispatch(usersActions.setFollowingProgress(userID, true));
  try {
    const res = await usersAPI.follow(userID);
    if (res.resultCode === ResultCode.Success) {
      dispatch(usersActions.followSuccess(userID));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
  dispatch(usersActions.setFollowingProgress(userID, false));
};
export const unfollow = (
  userID: number
): RootThunkType<UsersReducerActionsType> => async (dispatch) => {
  dispatch(usersActions.setFollowingProgress(userID, true));
  try {
    const res = await usersAPI.unfollow(userID);
    if (res.resultCode === ResultCode.Success) {
      dispatch(usersActions.unfollowSuccess(userID));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage);
    }
  } catch (e) {
    console.warn(e);
  }
  dispatch(usersActions.setFollowingProgress(userID, false));
};
// TCs
