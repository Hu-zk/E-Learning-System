import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <div className="teacher-layout app dark">
            <Sidebar/>
            <div className="outlet">
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout