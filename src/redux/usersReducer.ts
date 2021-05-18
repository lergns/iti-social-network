type PhotosType = {
  small: string;
  large: string;
};
export type UserType = {
  id: number;
  name: string;
  status: string;
  followed: boolean;
  photos: PhotosType;
};
type UsersInitialStateType = typeof usersInitialState;
type UsersReducerActionTypes =
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setIsFetching>
  | ReturnType<typeof setFollowingProgress>;
// TYPES

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_IS_FETCHING = "SET-IS-FETCHING";
const SET_FOLLOWING_PROGRESS = "SET-FOLLOWING-PROGRESS";

export const follow = (userID: number) =>
  ({
    type: FOLLOW,
    userID,
  } as const);
export const unfollow = (userID: number) =>
  ({
    type: UNFOLLOW,
    userID,
  } as const);
export const setUsers = (users: Array<UserType>) =>
  ({
    type: SET_USERS,
    users,
  } as const);
export const setCurrentPage = (currentPage: number) =>
  ({
    type: SET_CURRENT_PAGE,
    currentPage,
  } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
  } as const);
export const setIsFetching = (newIsFetching: boolean) =>
  ({
    type: SET_IS_FETCHING,
    newIsFetching,
  } as const);
export const setFollowingProgress = (
  userID: number,
  followingInProgress: boolean
) =>
  ({
    type: SET_FOLLOWING_PROGRESS,
    userID,
    followingInProgress,
  } as const);
// ACs

const usersInitialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

export const usersReducer = (
  usersState: UsersInitialStateType = usersInitialState,
  action: UsersReducerActionTypes
): UsersInitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.userID ? { ...user, followed: true } : user
        ), // also copying USER to be changed
      };

    case UNFOLLOW:
      return {
        ...usersState,
        users: usersState.users.map((user) =>
          user.id === action.userID ? { ...user, followed: false } : user
        ),
      };

    case SET_USERS:
      return { ...usersState, users: action.users };

    case SET_CURRENT_PAGE:
      return { ...usersState, currentPage: action.currentPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...usersState, totalUsersCount: action.totalUsersCount };

    case SET_IS_FETCHING:
      return { ...usersState, isFetching: action.newIsFetching };

    case SET_FOLLOWING_PROGRESS:
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
