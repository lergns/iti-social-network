import React from "react";
import classes from "./Users.module.css";
import userAva from "../../assets/images/userAva.png";
import { UserType } from "../../redux/usersReducer";
import { NavLink } from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  followingInProgress: Array<number>;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  onPageChange: (page: number) => void;
  setFollowingProgress: (userID: number, followingInProgress: boolean) => void;
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
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.setFollowingProgress(user.id, true);
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,

                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "264a0581-6cdc-4a28-9b7e-b8b5b1060aa0",
                          },
                        }
                      )
                      .then((promise) => {
                        if (promise.data.resultCode === 0) {
                          props.unfollow(user.id);
                        }
                        props.setFollowingProgress(user.id, false);
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.setFollowingProgress(user.id, true); // disabling button before async. HTTP request
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "264a0581-6cdc-4a28-9b7e-b8b5b1060aa0",
                          },
                        }
                      )
                      .then((promise) => {
                        if (promise.data.resultCode === 0) {
                          props.follow(user.id);
                        }
                        props.setFollowingProgress(user.id, false); // enabling button after async. HTTP request is resolved
                      });
                  }}
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
