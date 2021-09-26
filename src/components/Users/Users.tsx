import React from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User/User";
import {
  selectCurrentPageNumber,
  selectFollowingInProgress,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
} from "../../redux/users/usersSelectors";
import { selectIsAuth } from "../../redux/auth/authSelectors";

type UsersPropsType = {
  users: ReturnType<typeof selectUsers>;
  pageSize: ReturnType<typeof selectPageSize>;
  totalUsersCount: ReturnType<typeof selectTotalUsersCount>;
  currentPageNumber: ReturnType<typeof selectCurrentPageNumber>;
  followingInProgress: ReturnType<typeof selectFollowingInProgress>;
  onPageChange: (pageNumber: number) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  isAuth: ReturnType<typeof selectIsAuth>;
};

export const Users = React.memo(
  ({
    totalUsersCount,
    pageSize,
    onPageChange,
    currentPageNumber,
    users,
    followingInProgress,
    follow,
    unfollow,
    isAuth,
  }: UsersPropsType) => {
    return (
      <div>
        <Paginator
          currentPageNumber={currentPageNumber}
          onPageChange={onPageChange}
          pageSize={pageSize}
          totalItemsCount={totalUsersCount}
          portionSize={10}
        />
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
            isAuth={isAuth}
          />
        ))}
      </div>
    );
  }
);
