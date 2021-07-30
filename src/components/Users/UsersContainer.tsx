import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  follow,
  fetchUsers,
  setCurrentPage,
  unfollow,
} from "../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import { Preloader } from "../common/Preloader/Preloader";
import {
  selectCurrentPage,
  selectFollowingInProgress,
  selectIsFetching,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
} from "../../redux/usersSelectors";
// IMPORTS

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setCurrentPage: (currentPage: number) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  fetchUsers: (currentPageNumber: number, pageSize: number) => void;
};
type UsersClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// UsersContainer --> UsersClassContainer --> Users
class UsersClassContainer extends React.Component<UsersClassContainerPropsType> {
  componentDidMount() {
    this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.fetchUsers(pageNumber, this.props.pageSize);
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

/*const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  users: state.usersPage.users,
  pageSize: state.usersPage.pageSize,
  totalUsersCount: state.usersPage.totalUsersCount,
  currentPage: state.usersPage.currentPage,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress,
});*/

const mapStateToProps = (state: RootStateType) => ({
  users: selectUsers(state),
  pageSize: selectPageSize(state),
  totalUsersCount: selectTotalUsersCount(state),
  currentPage: selectCurrentPage(state),
  isFetching: selectIsFetching(state),
  followingInProgress: selectFollowingInProgress(state),
});

export const UsersContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, {
  setCurrentPage,
  follow,
  unfollow,
  fetchUsers,
})(UsersClassContainer);
