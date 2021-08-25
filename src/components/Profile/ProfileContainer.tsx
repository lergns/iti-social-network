import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
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
  getUserStatus: (userID: number) => void;
  updateUserStatus: (status: string) => void;
};
type ProfilePathParamsType = {
  userID: string;
};
type ProfileClassContainerPropsType = RouteComponentProps<ProfilePathParamsType> &
  MapStatePropsType &
  MapDispatchPropsType;
// TYPES

// ProfileContainer --> --> ProfileClassContainer --> Profile
class ProfileClassContainer extends React.PureComponent<ProfileClassContainerPropsType> {
  componentDidMount() {
    let userID = Number(this.props.match.params.userID);
    if (!userID && this.props.authUserID) {
      userID = this.props.authUserID;
    } else if (!userID && !this.props.authUserID) {
      this.props.history.push("/login"); // program redirect - not via JSX !
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

const mapStateToProps = (state: RootStateType) => ({
  userProfile: selectUserProfile(state),
  status: selectStatus(state),
  authUserID: selectAuthUserID(state),
  isAuth: selectIsAuth(state),
});

export const ProfileContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(
    mapStateToProps,
    {
      getUserProfile,
      getUserStatus,
      updateUserStatus,
    }
  ),
  withRouter,
  withAuthRedirect
)(ProfileClassContainer);
// the same as --> connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, })(withRouter(withAuthRedirect(ProfileClassContainer)))
