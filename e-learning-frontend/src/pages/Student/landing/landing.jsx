import React from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../../components/Student/userInfo/userInfo";
import "./landing.css";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdGrade } from "react-icons/md";

function Landing() {
  const navigate = useNavigate();
  const sidebar = [
    {
      svg: <AiFillHome size={32} />,
      onclick: () => navigate("/student"),
    },
    {
      svg: <BsFillChatLeftTextFill size={32} />,
      onclick: () => navigate("/student/InProcess"),
    },
    {
      svg: <MdGrade size={32} />,
      onclick: () => navigate("/student/Completed"),
    },
  ];
  return (
    <div className="landing-page">
      <Sidebar sidebarContent={sidebar} />
      <UserInfo />
    </div>
  );
}

export default Landing;
