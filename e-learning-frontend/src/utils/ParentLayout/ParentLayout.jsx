import React from "react";
import {Outlet} from "react-router-dom";
import './ParentLayout.css';
// import Sidebar from "../../components/Sidebar/Sidebar";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { MdGrade } from "react-icons/md";
import { Profile } from "../../components/profile/profile";
import {BsCameraVideoFill} from "react-icons/bs";

const ParentLayout = () => {
    const navigate = useNavigate();
    const sidebar = [
        {
        svg: <AiFillHome size={32} />,
        onclick: () => navigate("/parent"),
        },
        {
        svg: <ImStatsDots size={32} />,
        onclick: () => navigate("/parent/statistics"),
        },
        {
        svg: <BsCameraVideoFill size={32} />,
        onclick: () => navigate("/parent/bookmeet"),
        },
    ];

    return (
        <div className="Parent_layout app dark">
            <Sidebar sidebarContent={sidebar}/>
            <div className="outlet_parent">
                <Outlet/>
            </div>
            <div className="body_right">
                <Profile/>
            </div>
        </div>
    )
}

export default ParentLayout;