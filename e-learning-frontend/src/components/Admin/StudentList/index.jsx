import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';

function StudentList() {
    const [students, setStudents] = useState('');
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                console.log(response.data)
                setStudents(response.data.students)
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);
    
    console.log('students:', students);

    if (!students) {
        return <p>Loading students...</p>;
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
                {students.map((students,index)=>(
                    <tr key={index}>
                        <td>{students.id}</td>
                        <td>{students.name}</td>
                        <td>{students.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default StudentList