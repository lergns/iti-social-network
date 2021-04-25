import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootStateType } from "../../redux/redux-store";
import { Users } from "./Users";
import {
  followAC,
  setUsersAC,
  unfollowAC,
  UserType,
} from "../../redux/usersReducer";
// IMPORTS

type MapStatePropsType = {
  users: Array<UserType>;
};
type MapDispatchPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: Array<UserType>) => void;
};
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    follow: (userID: number) => {
      dispatch(followAC(userID));
    },
    unfollow: (userID: number) => {
      dispatch(unfollowAC(userID));
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users));
    },
  };
};

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
