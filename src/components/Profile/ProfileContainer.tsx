import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  UserProfileType,
} from "../../redux/profileReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
// IMPORTS

type MapStatePropsType = {
  userProfile: UserProfileType;
  status: string;
};
type MapDispatchPropsType = {
  getUserProfile: (userID: number) => void;
  getUserStatus: (userID: number) => void;
  updateUserStatus: (status: string) => void;
};
type ProfileClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
type ProfilePathParamsType = {
  userID: string;
};
type ProfileClassContainerWithURLPropsType = RouteComponentProps<ProfilePathParamsType> &
  ProfileClassContainerPropsType;
// TYPES

// ProfileContainer --> --> ProfileClassContainer --> Profile
class ProfileClassContainer extends React.Component<
  ProfileClassContainerWithURLPropsType,
  UserProfileType
> {
  componentDidMount() {
    let userID = Number(this.props.match.params.userID);
    if (!userID) {
      userID = 2;
    }
    this.props.getUserProfile(userID);
    this.props.getUserStatus(userID);
  }

  render = () => {
    return (
      <Profile
        userProfile={this.props.userProfile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  userProfile: state.profilePage.userProfile,
  status: state.profilePage.status,
});

export const ProfileContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter,
  withAuthRedirect
)(ProfileClassContainer);
// the same as --> connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, })(withRouter(withAuthRedirect(ProfileClassContainer)))
