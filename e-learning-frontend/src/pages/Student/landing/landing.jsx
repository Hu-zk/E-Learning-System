import React from "react";
import UserInfo from "../../../components/Student/userInfo/userInfo";
import "./landing.css";
import Courses from "../../../components/Student/courses/courses";

function Landing() {
  return (
    <div className="page-content">
      <UserInfo />
      <Courses />
    </div>
  );
}

export default Landing;
