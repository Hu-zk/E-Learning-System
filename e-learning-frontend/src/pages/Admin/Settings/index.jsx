import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import { Outlet, useNavigate } from 'react-router-dom';
import "./style.css";

function Settings() {

    // const navigate = useNavigate();

    const nav={
        "title":'Settings :',
    } 

    return (
        <div>
            <Navbar nav={nav}/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Settings