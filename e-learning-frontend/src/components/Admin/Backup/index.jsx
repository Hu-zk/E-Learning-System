import React from 'react'
import "./style.css"
import { sendRequest } from '../../../core/config/request';

function Backup() {

    const handleBackup= async() => {
        try {
            const response = await sendRequest({
                route: "/user/admin/create-course",
            });
            console.log(response)
        } catch (error) {
            console.error('failed:', error);
        }
    }

    return (
        <div className="backup-container">
            <h3>Backup :</h3>
            <p>Backup your database NOW </p>
            <button className='backup-button' onClick={handleBackup}>Backup</button>
        </div>
    )
}

export default Backup