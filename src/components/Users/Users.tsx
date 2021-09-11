import React from "react";
import { UserType } from "../../api/API";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User/User";

type UsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  followingInProgress: Array<number>;
  onPageChange: (page: number) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  isAuth: boolean;
};

export const Users = React.memo(
  ({
    totalUsersCount,
    pageSize,
    onPageChange,
    currentPage,
    users,
    followingInProgress,
    follow,
    unfollow,
    isAuth,
  }: UsersPropsType) => {
    return (
      <div>
        <Paginator
          currentPage={currentPage}
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
