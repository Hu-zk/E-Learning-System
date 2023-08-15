import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import Appearance from '../../../components/Admin/Appearance';
import EmailSection from '../../../components/Admin/EmailSection';
import "./style.css";

function Settings() {

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