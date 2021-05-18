import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  follow,
  setCurrentPage,
  setFollowingProgress,
  setIsFetching,
  setTotalUsersCount,
  setUsers,
  unfollow,
  UserType,
} from "../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import { Preloader } from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/API";
// IMPORTS

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};
type MapDispatchPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalUsersCount: number) => void;
  setIsFetching: (newIsFetching: boolean) => void;
  setFollowingProgress: (userID: number, followingInProgress: boolean) => void;
};
type UsersClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// container component --> container component --> presentational component
class UsersClassContainer extends React.Component<
  UsersClassContainerPropsType,
  Array<UserType>
> {
  componentDidMount() {
    this.props.setIsFetching(true);
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((promiseData) => {
        this.props.setIsFetching(false);
        this.props.setUsers(promiseData.items);
        this.props.setTotalUsersCount(promiseData.totalCount);
      });
  }

  onPageChange = (pageNumber: number) => {
    this.props.setIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    usersAPI.getUsers(pageNumber, this.props.pageSize).then((promiseData) => {
      this.props.setUsers(promiseData.items);
      this.props.setIsFetching(false);
    });
  };

  render = () => {
    return (
      <>
        {this.props.isFetching && <Preloader />}
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          onPageChange={this.onPageChange}
          followingInProgress={this.props.followingInProgress}
          setFollowingProgress={this.props.setFollowingProgress}
        />
      </>
    );
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  users: state.usersPage.users,
  pageSize: state.usersPage.pageSize,
  totalUsersCount: state.usersPage.totalUsersCount,
  currentPage: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress,
});

export const UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
  setFollowingProgress,
})(UsersClassContainer);
