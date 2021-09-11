import React, { ChangeEvent, useEffect, useState } from "react";

type ProfileStatusPropsType = {
  status: string;
  updateProfileStatus: (status: string) => void;
};

export const ProfileStatus = React.memo((props: ProfileStatusPropsType) => {
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]); // async. response (status) received --> props.status changed --> useEffect is called
  // useEffect() is always executed asynchronously after component returns JSX (after mounting/updating in DOM) !

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  // useState()'s setSTATE() invokes component re-rendering

  const activateEditMode = () => setEditMode(true);
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateProfileStatus(status);
  };
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) =>
    setStatus(event.currentTarget.value);

  return (
    <div>
      {editMode ? (
        <div>
          <input
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
            value={status}
            autoFocus
          />
        </div>
      ) : (
        <div>
          <b>Status: </b>
          <span onDoubleClick={activateEditMode}>
            {props.status || "No status"}
          </span>
        </div>
      )}
    </div>
  );
});
