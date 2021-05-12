import React from "react";
import { Profile } from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import { setUserProfile, UserProfileType } from "../../redux/profileReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
// IMPORTS

type MapStatePropsType = {
  userProfile: UserProfileType;
};
type MapDispatchPropsType = {
  setUserProfile: (userProfile: UserProfileType) => void;
};
type ProfileClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfilePathParamsType = {
  userID: string;
};
type ProfileClassContainerURLPropsType = RouteComponentProps<ProfilePathParamsType> &
  ProfileClassContainerPropsType;
// TYPES

// container component --> container component --> container component --> presentational component
class ProfileClassContainer extends React.Component<
  ProfileClassContainerURLPropsType,
  UserProfileType
> {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = "2";
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
      .then((promise) => {
        this.props.setUserProfile(promise.data);
      });
  }

  render = () => {
    return <Profile {...this.props} userProfile={this.props.userProfile} />;
  };
}

const ProfileURLContainer = withRouter(ProfileClassContainer);

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  userProfile: state.profilePage.userProfile,
});

// HOC connect() automatically creates MDTP object (whose properties are references to AC functions)
export const ProfileContainer = connect(mapStateToProps, { setUserProfile })(
  ProfileURLContainer
);
