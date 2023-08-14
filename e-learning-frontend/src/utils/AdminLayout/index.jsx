import React from 'react'
import "./style.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AiFillHome, AiFillPlusCircle, AiFillSetting, AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { CgDisplayFullwidth } from 'react-icons/cg';

function AdminLayout() {
    const navigate = useNavigate();
    const sidebar = [
    {
        svg: <AiFillHome size={32} />,
        onclick: () => navigate("/admin"),
    },
    {
        svg: <AiFillPlusCircle size={32} />,
        onclick: () => navigate("/admin/create"),
    },
    {
        svg: <CgDisplayFullwidth size={32} />,
        onclick: () => navigate("/admin/display"),
    },
    {
        svg: <AiOutlineFundProjectionScreen size={32} />,
        onclick: () => navigate("/admin"),
    },
    {
        svg: <AiFillSetting size={32} />,
        onclick: () => navigate("/admin/settings"),
    },
    ];
    return (
        <div className="admin-layout app dark">
            <Sidebar sidebarContent={sidebar}/>
            <div className="admin-outlet">
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout