import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";
import {
  fetchUsers,
  follow,
  unfollow,
  usersActions,
} from "../../redux/users/usersReducer";
import { Users } from "./Users";
import React from "react";
import { Preloader } from "../common/Preloader/Preloader";
import {
  selectCurrentPageNumber,
  selectFollowingInProgress,
  selectIsFetching,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
} from "../../redux/users/usersSelectors";
import { selectIsAuth } from "../../redux/auth/authSelectors";
// IMPORTS

type MapStatePropsType = {
  users: ReturnType<typeof selectUsers>;
  pageSize: ReturnType<typeof selectPageSize>;
  totalUsersCount: ReturnType<typeof selectTotalUsersCount>;
  currentPageNumber: ReturnType<typeof selectCurrentPageNumber>;
  isFetching: ReturnType<typeof selectIsFetching>;
  followingInProgress: ReturnType<typeof selectFollowingInProgress>;
  isAuth: ReturnType<typeof selectIsAuth>;
};
type MapDispatchPropsType = {
  setCurrentPageNumber: (currentPage: number) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  fetchUsers: (currentPageNumber: number, pageSize: number) => void;
};
type UsersClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// UsersContainer --> UsersClassContainer --> Users
class UsersClassContainer extends React.PureComponent<UsersClassContainerPropsType> {
  componentDidMount() {
    this.props.fetchUsers(this.props.currentPageNumber, this.props.pageSize);
  }

  onPageChange = (pageNumber: number) => {
    this.props.setCurrentPageNumber(pageNumber);
    this.props.fetchUsers(pageNumber, this.props.pageSize);
  };

  render = () => {
    return (
      <div>
        {this.props.isFetching && <Preloader />}
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPageNumber={this.props.currentPageNumber}
          onPageChange={this.onPageChange}
          followingInProgress={this.props.followingInProgress}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          isAuth={this.props.isAuth}
        />
      </div>
    );
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  users: selectUsers(state),
  pageSize: selectPageSize(state),
  totalUsersCount: selectTotalUsersCount(state),
  currentPageNumber: selectCurrentPageNumber(state),
  isFetching: selectIsFetching(state),
  followingInProgress: selectFollowingInProgress(state),
  isAuth: selectIsAuth(state),
});

const UsersContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, {
  setCurrentPageNumber: usersActions.setCurrentPageNumber,
  follow,
  unfollow,
  fetchUsers,
})(UsersClassContainer);

export default UsersContainer;
