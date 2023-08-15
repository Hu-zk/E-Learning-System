import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import Appearance from '../../../components/Admin/Appearance';
import { Outlet } from 'react-router-dom';
import "./style.css";
import EmailSection from '../../../components/Admin/EmailSection';

function Settings() {

    // const navigate = useNavigate();

    const nav={
        "title":'Settings :',
    } 

    return (
        <div>
            <Navbar nav={nav}/>
            <div className='setting-page'>
                <Appearance/>
                <EmailSection/>
            </div>
        </div>
    )
}

export default Settings