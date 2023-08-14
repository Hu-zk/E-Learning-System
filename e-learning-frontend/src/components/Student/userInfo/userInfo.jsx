import React, { useContext } from "react";
import "./userInfo.css";
import { AuthContext } from "../../../Context/AuthContext";
function UserInfo() {
  const { userData } = useContext(AuthContext);
  return (
    <div className="top-side">
      <div className="user-info">
        <div className="image">
          <img src="image.jpg" alt="" />
        </div>
        <div className="info">
          <div className="name">{userData.name}</div>
          <div className="name">{userData.email}</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
