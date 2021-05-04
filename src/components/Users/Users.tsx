import React from "react";
import classes from "./Users.module.css";
import userAva from "../../assets/images/userAva.png";
import axios from "axios";
import { UsersPropsType } from "./UsersContainer";
import { UserType } from "../../redux/usersReducer";

// React.Component<COMPONENT PROPS TYPE, COMPONENT STATE TYPE>
export class Users extends React.Component<UsersPropsType, Array<UserType>> {
  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((promise) => {
        this.props.setUsers(promise.data.items);
      });
  }

  render = () => {
    return (
      <div>
        {this.props.users.map((user) => (
          <div key={user.id}>
            <span>
              <div>
                <img
                  src={user.photos.small ? user.photos.small : userAva}
                  className={classes.userPhoto}
                  alt={"user avatar"}
                />
              </div>
              <div>
                {user.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(user.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(user.id);
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
  };
}
