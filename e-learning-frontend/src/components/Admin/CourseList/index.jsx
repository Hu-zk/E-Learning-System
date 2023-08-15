import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';

function CourseList() {
    const [courses, setCourses] = useState('');
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                console.log(response.data)
                setCourses(response.data.courses)
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);
    
    console.log('courses:', courses);

    if (!courses) {
        return <p>Loading courses...</p>;
    }
    return (
        <div className="table-container">
        <table id="contactsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Teacher id</th>
                    <th>Capacity</th>
                </tr>
            </thead>
            <tbody id="contactsBody">
                {courses.map((courses,index)=>(
                    <tr key={index}>
                        <td>{courses.id}</td>
                        <td>{courses.name}</td>
                        <td>{courses.teacher_id}</td>
                        <td>{courses.capacity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default CourseList