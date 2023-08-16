import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import Appearance from '../../../components/Admin/Appearance';
import EmailSection from '../../../components/Admin/EmailSection';
import Backup from '../../../components/Admin/Backup';
import "./style.css";

function Settings({mode,setMode}) {

    const nav={
        "title":'Settings :',
    } 

    return (
        <div>
            <Navbar nav={nav}/>
            <div className='setting-page'>
                <EmailSection/>
                <Appearance mode={mode} setMode={setMode}/>
                <Backup/>
            </div>
        </div>
    )
}

export default Settings