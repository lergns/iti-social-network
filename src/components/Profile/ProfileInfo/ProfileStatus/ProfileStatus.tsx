import React, { ChangeEvent } from "react";

type ProfileStatusPropsType = {
  status: string;
  updateUserStatus: (status: string) => void;
};
type ProfileStatusStateType = {
  editMode: boolean;
  status: string;
};

// React.Component<COMPONENT PROPS TYPE, COMPONENT STATE TYPE>
export class ProfileStatus extends React.Component<
  ProfileStatusPropsType,
  ProfileStatusStateType
> {
  state = {
    editMode: false,
    status: this.props.status,
  }; // CLASS.state --> local state of class component

  componentDidUpdate(
    prevProps: ProfileStatusPropsType,
    prevState: ProfileStatusStateType
  ) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  activateEditMode = () => {
    this.setState({ editMode: true }); // setState() - React.Component method - accepts object with state properties to be changed, as its input parameter ; setState() is executed asynchronously !
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateUserStatus(this.state.status);
  };

  onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: event.currentTarget.value });
  };

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            <input
              onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
              autoFocus
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "No status"}
            </span>
          </div>
        )}
      </div>
    );
  }
}
