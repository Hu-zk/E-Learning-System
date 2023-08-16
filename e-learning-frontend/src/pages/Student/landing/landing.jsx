import React from "react";
import UserInfo, {
  Profile,
} from "../../../components/Student/userInfo/userInfo";
import "./landing.css";
import Courses from "../../../components/Student/courses/courses";

function Landing() {
  return (
    <div className="page-content">
      <Courses />
      <div className="profile">
        <Profile />
      </div>
    </div>
  );
}

export default Landing;
