import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import { Outlet, useNavigate } from 'react-router-dom';
import CourseList from '../../../components/Admin/CourseList';
import StudentList from '../../../components/Admin/StudentList';
import TeacherList from '../../../components/Admin/TeacherList';
import ParentList from '../../../components/Admin/ParentList';
import UserList from '../../../components/Admin/UsersList';
import "./style.css";

function Settings() {

    const navigate = useNavigate();

    const nav={
        "title":'Settings :',
        "content":[
            {title:'Courses',onclick: () => navigate('/admin/Settings/courses', { element: <CourseList /> })},
            {title:'All Users',onclick: () => navigate("/admin/Settings/users", { element: <UserList /> })},
            {title:'Students',onclick: () => navigate("/admin/Settings/students", { element: <StudentList /> })},
            {title:'Teachers',onclick: () => navigate("/admin/Settings/teachers", { element: <TeacherList /> })},
            {title:'Parents',onclick: () => navigate("/admin/Settings/parents", { element: <ParentList /> })},
        ]
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