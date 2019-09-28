import React, { useContext } from "react";
import './UserList.css';

import { StateContext } from "../../App";


export default function UserList({ actionType, userList }) {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="users">
      {userList.map(user => (
        <div
          className="user-container"
          onClick={() => dispatch({ type: actionType, payload: user.id })}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}
