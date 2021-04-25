type LocationType = {
  country: string;
  city: string;
};
export type UserType = {
  id: number;
  fullName: string;
  status: string;
  isFollowed: boolean;
  photoURL: string;
  location: LocationType;
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
    {
      id: 1,
      fullName: "Alex",
      status: "I love Stacy!",
      isFollowed: false,
      photoURL:
        "https://m.gorod.cn.ua/image/news/gorod_5/gr_19.09.13_serdyuk.jpg",
      location: { country: "Ukraine", city: "Vinnytsia" },
    },
    {
      id: 2,
      fullName: "Stacy",
      status: "I love Gracy and Chill!",
      isFollowed: true,
      photoURL:
        "https://sun9-32.userapi.com/impf/KqU4JU9aen1UDMSYYLOUTE2Zon9QfWM8F_Y4Fw/LUjpqeqEKjY.jpg?size=320x478&quality=96&sign=68e58198542832fdf293450863d631a6&type=album",
      location: { country: "Ukraine", city: "Chernihiv" },
    },
    {
      id: 3,
      fullName: "Gracy",
      status: "zzZz",
      isFollowed: true,
      photoURL:
        "https://sun9-30.userapi.com/impf/c637218/v637218150/3fe1a/hRat8KEQLDc.jpg?size=483x604&quality=96&sign=19887f01eb30082af86cfcb242397acb&c_uniq_tag=dGx4lq5uixXCYHrRWrR_mc2cXBhKxB8Jq1IRNwFhasI&type=album",
      location: { country: "Ukraine", city: "Starosillya" },
    },
    {
      id: 4,
      fullName: "Chill",
      status: "Woof!",
      isFollowed: false,
      photoURL: "https://nekusaka.com/wp-content/uploads/2017/02/korgi-15.jpg",
      location: { country: "UK", city: "London" },
    },
  ] as Array<UserType>,
};

export const usersReducer = (
  state: UsersInitialStateType = usersInitialState,
  action: UsersReducerActionTypes
): UsersInitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userID ? { ...user, isFollowed: true } : user
        ), // also copying USER to be changed (state === Array<UserType>) !
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userID ? { ...user, isFollowed: false } : user
        ),
      };

    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] }; // adding users received from action dispatch to the end of copy of the original state.users array

    default:
      return state;
  }
};
