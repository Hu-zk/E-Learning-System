import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Admin/Navbar'
import Appearance from '../../../components/Admin/Appearance';
import EmailSection from '../../../components/Admin/EmailSection';
import Backup from '../../../components/Admin/Backup';
import { sendRequest } from '../../../core/config/request';
import { requestMethods } from '../../../core/enums/requestMethods';
import "./style.css";

function Settings() {

    const nav={
        "title":'Settings :',
    } 

    const [mode, setMode] = useState('');

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/shared/get-appearance",
                    method: requestMethods.GET,
                });
                setMode(response)
            } catch (error) {
                console.error('failed:', error);
            }
        }
        fetchData();
    }, []);

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