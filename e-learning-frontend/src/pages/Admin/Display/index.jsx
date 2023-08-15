import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Admin/Navbar'
import { useNavigate } from 'react-router-dom';
import CourseList from '../../../components/Admin/CourseList';
import StudentList from '../../../components/Admin/StudentList';
import TeacherList from '../../../components/Admin/TeacherList';
import ParentList from '../../../components/Admin/ParentList';
import { sendRequest } from '../../../core/config/request';
import { requestMethods } from '../../../core/enums/requestMethods';
import "./style.css";

function Display() {
    const navigate = useNavigate();

    const nav={
        "title":'Display :',
        "content":[
            {title:'Courses',onclick: () => navigate("/admin")},
            {title:'All Users',onclick: () => navigate("/admin")},
            {title:'Students',onclick: () => navigate("/admin")},
            {title:'Teachers',onclick: () => navigate("/admin")},
            {title:'Parents',onclick: () => navigate("/admin")},
        ]
    } 

    const [users, setUsers] = useState('');
    const [teachers, setTeachers] = useState('');
    const [students, setStudents] = useState('');
    const [parents, setParents] = useState('');
    const [courses, setCourses] = useState('');

    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                console.log(response.data)
                setTeachers(response.data.teachers)
                setStudents(response.data.students)
                setParents(response.data.parents)
                setCourses(response.data.courses)
                setUsers(teachers.concat(parents,students))
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);

    return (
        <div>
        <Navbar nav={nav} />

        <div className='lists'>
            <CourseList courses={courses}/>
            <ParentList users={users}/>
            <StudentList students={students}/>
            <TeacherList teachers={teachers}/>
            <ParentList parents={parents}/>
        </div>

        </div>
    )
}

export default Display