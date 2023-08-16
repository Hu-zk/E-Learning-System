import { FiLogOut } from "react-icons/fi";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarContent }) => {
  const navigate = useNavigate();
  const [content, useContent] = useState(sidebarContent ? sidebarContent : []);
  return (
    <div className="sidebar">
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          fill="var(--white)"
          width="20px">
          <path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z" />
        </svg>
      </div>

      <div className="mid">
        {content.map((nav, index) => {
          return (
            <div className="one-navigate" key={index} onClick={nav.onclick}>
              {nav.svg}
            </div>
          );
        })}
      </div>
      <div
        className="bottom one-navigate"
        onClick={() => { localStorage.clear();
          ;navigate("/")}}>
        <FiLogOut size={35} />
      </div>
    </div>
  );
};

export default Sidebar;
