import React from "react";
import classes from "./Users.module.css";
import userAva from "../../assets/images/userAva.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../api/API";

type UsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  followingInProgress: Array<number>;
  onPageChange: (page: number) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
};

export const Users = React.memo((props: UsersPropsType) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); // Math.ceil() - rounding to higher integer

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((page) => {
          return (
            <span
              onClick={() => {
                props.onPageChange(page);
              }}
              className={
                props.currentPage === page ? classes.selectedPage : classes.page
              }
            >
              {page}
            </span>
          );
        })}
      </div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img
                  src={user.photos.small ? user.photos.small : userAva}
                  className={classes.userPhoto}
                  alt={"user avatar"}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  style={{ cursor: "pointer" }}
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => props.unfollow(user.id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  style={{ cursor: "pointer" }}
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => props.follow(user.id)}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
});
