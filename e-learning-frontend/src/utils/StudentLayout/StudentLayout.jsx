import { Outlet } from "react-router-dom";
import "./style.css";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdGrade } from "react-icons/md";
import UserInfo from "../../components/Student/userInfo/userInfo";

const StudentLayout = () => {
  const navigate = useNavigate();
  const sidebar = [
    {
      svg: <AiFillHome size={32} />,
      onclick: () => navigate("/student"),
    },
    {
      svg: <BsFillChatLeftTextFill size={32} />,
      onclick: () => navigate("/student/inprogress"),
    },
    {
      svg: <MdGrade size={32} />,
      onclick: () => navigate("/student/Completed"),
    },
  ];
  return (
    <div className="student-landing-page">
      <Sidebar sidebarContent={sidebar} />
      <Outlet />
    </div>
  );
};

export default StudentLayout;
