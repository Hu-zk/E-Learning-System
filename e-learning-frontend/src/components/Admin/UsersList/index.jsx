import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';

function UserList() {

    const [users, setUsers] = useState('');
    
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                setUsers(response.data.teachers.concat(response.data.parents,response.data.students))
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);
    
    console.log('users:', users);

    const handleDelete = (id) => {
        // Perform delete operation based on the user ID
        // You can send a DELETE request to your API here
        console.log(`Delete user with ID: ${id}`);
    };
    
    const handleEdit = (id) => {
        // Open the edit form or modal based on the user ID
        console.log(`Edit user with ID: ${id}`);
    };

    if (!users) {
        return <p>Loading users...</p>;
    }

    return (
        <div className="table-container">
        <table id="contactsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody id="contactsBody">
                {users.map((users,index)=>(
                    <tr key={index}>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.user_type_id === 2
                            ? 'Teacher'
                            : users.user_type_id === 3
                            ? 'Parent'
                            : 'Student'}
                        </td>
                        <td>{users.email}</td>
                        <td>
                            <button onClick={() => handleEdit(users.id)}>Edit</button>
                            <button onClick={() => handleDelete(users.id)}>Delete</button>
                        </td>
                    </tr>
                    
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default UserList