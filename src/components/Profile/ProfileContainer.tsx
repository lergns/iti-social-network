import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import { getUserProfile, UserProfileType } from "../../redux/profileReducer";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
// IMPORTS

type MapStatePropsType = {
  userProfile: UserProfileType;
  isAuth: boolean;
};
type MapDispatchPropsType = {
  getUserProfile: (userID: number) => void;
};
type ProfileClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfilePathParamsType = {
  userID: string;
};
type ProfileClassContainerURLPropsType = RouteComponentProps<ProfilePathParamsType> &
  ProfileClassContainerPropsType;
// TYPES

// ProfileContainer --> ProfileURLContainer --> ProfileClassContainer --> Profile
class ProfileClassContainer extends React.Component<
  ProfileClassContainerURLPropsType,
  UserProfileType
> {
  componentDidMount() {
    let userID = Number(this.props.match.params.userID);
    if (!userID) {
      userID = 2;
    }
    this.props.getUserProfile(userID);
  }

  render = () => {
    if (!this.props.isAuth) return <Redirect to={"/login"} />; // if user is not authorized, redirect to ".../login"

    return <Profile userProfile={this.props.userProfile} />;
  };
}

const ProfileURLContainer = withRouter(ProfileClassContainer);

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  userProfile: state.profilePage.userProfile,
  isAuth: state.auth.isAuth,
});

export const ProfileContainer = connect(mapStateToProps, { getUserProfile })(
  ProfileURLContainer
);
