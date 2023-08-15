import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';
import StudentProgress from '../StudentProgress';

function StudentList() {
    const [students, setStudents] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    
    
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

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };
    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="table-container">
        <table id="contactsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Parent id</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody id="contactsBody">
                {students.map((students,index)=>(
                    <tr key={index}>
                        <td>{students.id}</td>
                        <td>{students.name}</td>
                        <td>{students.parent_id}</td>
                        <td>{students.email}</td>
                        <td className='list-buttons'>
                            <button className='edit-button' onClick={() => handleEdit(students.id)}>Statistics</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showEditModal && (
        <StudentProgress
            user={selectedUser}
            onClose={handleCloseModal}
        />
        )}
    </div>
    )
}

export default StudentList