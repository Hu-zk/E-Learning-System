import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';

function TeacherList() {
    const [teacher, setTeacher] = useState('');
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                console.log(response.data)
                setTeacher(response.data.teachers)
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);
    
    console.log('teacher:', teacher);

    if (!teacher) {
        return <p>Loading teacher...</p>;
    }

    return (
        <div className="table-container">
        <table id="contactsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody id="contactsBody">
                {teacher.map((teacher,index)=>(
                    <tr key={index}>
                        <td>{teacher.id}</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default TeacherList