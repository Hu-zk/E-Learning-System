import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Admin/Navbar'
import { Outlet, useNavigate } from 'react-router-dom';
import CourseList from '../../../components/Admin/CourseList';
import StudentList from '../../../components/Admin/StudentList';
import TeacherList from '../../../components/Admin/TeacherList';
import ParentList from '../../../components/Admin/ParentList';
// import { sendRequest } from '../../../core/config/request';
// import { requestMethods } from '../../../core/enums/requestMethods';
import "./style.css";
import UserList from '../../../components/Admin/UsersList';

function Display() {


    // const [users, setUsers] = useState('');
    // const [teachers, setTeachers] = useState('');
    // const [students, setStudents] = useState('');
    // const [parents, setParents] = useState('');
    // const [courses, setCourses] = useState('');

    
    // useEffect(() => {
    //     const fetchData = async () =>{
    //         try {
    //             const response = await sendRequest({
    //                 route: "/user/admin/get-users",
    //                 method: requestMethods.GET,
    //             });
    //             console.log(response.data)
    //             setTeachers(response.data.teachers)
    //             setStudents(response.data.students)
    //             setParents(response.data.parents)
    //             setCourses(response.data.courses)
    //             setUsers(teachers.concat(parents,students))
    //         } catch (error) {
    //             console.error('failed:', error);
    //         }
    //     }
    
    //     fetchData();
    // }, []);

    // console.log('Courses:', courses);
    // console.log('students:', students);
    // console.log('users:', users);
    // console.log('parents:', parents);
    // console.log('teachers:', teachers);

    const navigate = useNavigate();

    const nav={
        "title":'Display :',
        "content":[
            {title:'Courses',onclick: () => navigate('/admin/display/courses', { element: <CourseList /> })},
            {title:'All Users',onclick: () => navigate("/admin/display/users", { element: <UserList /> })},
            {title:'Students',onclick: () => navigate("/admin/display/students", { element: <StudentList /> })},
            {title:'Teachers',onclick: () => navigate("/admin/display/teachers", { element: <TeacherList /> })},
            {title:'Parents',onclick: () => navigate("/admin/display/parents", { element: <ParentList /> })},
            // {title:'Courses',onclick: () => navigate('/admin/display/courses', { element: <CourseList courses={courses}/> })},
            // {title:'All Users',onclick: () => navigate("/admin/display/students", { element: <StudentList students={students}/> })},
            // {title:'Students',onclick: () => navigate("/admin/display/students", { element: <CourseList courses={courses}/> })},
            // {title:'Teachers',onclick: () => navigate("/admin/display/teachers", { element: <TeacherList teachers={teachers}/> })},
            // {title:'Parents',onclick: () => navigate("/admin/display/parents", { element: <ParentList parents={parents}/> })},
        ]
    } 

    return (
        <div>
            <Navbar nav={nav}/>
            <div className="admin-outlet">
                <Outlet/>
            </div>
        </div>
    )
}

export default Display