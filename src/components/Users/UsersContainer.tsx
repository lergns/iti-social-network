import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  follow,
  unfollow,
  getUsers,
  setCurrentPage,
  UserType,
} from "../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import { Preloader } from "../common/Preloader/Preloader";
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
  setCurrentPage: (currentPage: number) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  getUsers: (currentPageNumber: number, pageSize: number) => void;
};
type UsersClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// UsersContainer --> UsersClassContainer --> Users
class UsersClassContainer extends React.Component<
  UsersClassContainerPropsType,
  Array<UserType>
> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
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
          onPageChange={this.onPageChange}
          followingInProgress={this.props.followingInProgress}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
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
  setCurrentPage,
  follow,
  unfollow,
  getUsers,
})(UsersClassContainer);
