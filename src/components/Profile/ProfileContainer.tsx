import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  getProfileStatus,
  getUserProfile,
  updateProfilePhoto,
  updateProfileStatus,
} from "../../redux/profile/profileReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  selectStatus,
  selectUserProfile,
} from "../../redux/profile/profileSelectors";
import { selectAuthUserID, selectIsAuth } from "../../redux/auth/authSelectors";
// IMPORTS

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  getUserProfile: (userID: number) => void;
  getProfileStatus: (userID: number) => void;
  updateProfileStatus: (status: string) => void;
  updateProfilePhoto: (photo: File) => void;
};
type ProfilePathParamsType = {
  userID: string;
};
type ProfileClassContainerPropsType = RouteComponentProps<ProfilePathParamsType> &
  MapStatePropsType &
  MapDispatchPropsType;
// TYPES

// ProfileContainer --> ProfileClassContainer --> Profile
class ProfileClassContainer extends React.PureComponent<ProfileClassContainerPropsType> {
  updateUserProfile() {
    let userID = Number(this.props.match.params.userID);
    if (!userID && this.props.authUserID) {
      userID = this.props.authUserID;
    } else if (!userID && !this.props.authUserID) {
      this.props.history.push("/login"); // program redirect - not via JSX !
    }
    this.props.getUserProfile(userID);
    this.props.getProfileStatus(userID);
  }

  componentDidMount() {
    this.updateUserProfile();
  }

  componentDidUpdate(prevProps: Readonly<ProfileClassContainerPropsType>) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.updateUserProfile();
    } // executing componentDidUpdate()'s body inside of condition !
  }

  render = () => {
    return (
      <Profile
        isProfileOwner={!this.props.match.params.userID}
        userProfile={this.props.userProfile}
        status={this.props.status}
        updateProfileStatus={this.props.updateProfileStatus}
        updateProfilePhoto={this.props.updateProfilePhoto}
      />
    );
  };
}

const mapStateToProps = (state: RootStateType) => ({
  userProfile: selectUserProfile(state),
  status: selectStatus(state),
  authUserID: selectAuthUserID(state),
  isAuth: selectIsAuth(state),
});

const ProfileContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(
    mapStateToProps,
    {
      getUserProfile,
      getProfileStatus,
      updateProfileStatus,
      updateProfilePhoto,
    }
  ),
  withRouter,
  withAuthRedirect
)(ProfileClassContainer);
// the same as --> connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto })(withRouter(withAuthRedirect(ProfileClassContainer)))

export default ProfileContainer;
