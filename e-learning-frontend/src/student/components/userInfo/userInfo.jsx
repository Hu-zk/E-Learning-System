import React from "react";
import "./userInfo.css";
function UserInfo() {
  return (
    <div className="top-side">
      <div className="user-info">
        <div className="image">
          <img src="image.jpg" alt="" />
        </div>
        <div className="info">
          <div className="name">name</div>
          <div className="name">email</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
