import React from "react";
import classes from "./User.module.css";
import userAva from "../../../assets/images/userAva.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../api/users-api";
import { selectFollowingInProgress } from "../../../redux/users/usersSelectors";
import { selectIsAuth } from "../../../redux/auth/authSelectors";

type UserPropsType = {
  user: UserType;
  followingInProgress: ReturnType<typeof selectFollowingInProgress>;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  isAuth: ReturnType<typeof selectIsAuth>;
};

export const User = React.memo(
  ({ user, followingInProgress, follow, unfollow, isAuth }: UserPropsType) => {
    return (
      <div>
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
                disabled={
                  !isAuth || followingInProgress.some((id) => id === user.id)
                }
                onClick={() => unfollow(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                style={{ cursor: "pointer" }}
                disabled={
                  !isAuth || followingInProgress.some((id) => id === user.id)
                }
                onClick={() => follow(user.id)}
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
    );
  }
);
