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
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>;
// TYPES

export const followAC = (userID: number) =>
  ({
    type: FOLLOW,
    userID,
  } as const);
export const unfollowAC = (userID: number) =>
  ({
    type: UNFOLLOW,
    userID,
  } as const);
export const setUsersAC = (users: Array<UserType>) =>
  ({
    type: SET_USERS,
    users,
  } as const);

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

const usersInitialState = {
  users: [
    /*{
      id: 1,
      name: "Alex",
      status: "I love Stacy!",
      followed: false,
      photos: {
        large: "",
        small: "",
      },
    },
    {
      id: 2,
      name: "Stacy",
      status: "I love Gracy and Chill!",
      followed: true,
      photos: {
        large: "",
        small: "",
      },
    },
    {
      id: 3,
      name: "Gracy",
      status: "zzZz",
      followed: true,
      photos: {
        large: "",
        small: "",
      },
    },
    {
      id: 4,
      name: "Chill",
      status: "Woof!",
      followed: false,
      photos: {
        large: "",
        small: "",
      },
    },*/
  ] as Array<UserType>,
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
      return { ...usersState, users: [...usersState.users, ...action.users] };

    default:
      return usersState;
  }
};
