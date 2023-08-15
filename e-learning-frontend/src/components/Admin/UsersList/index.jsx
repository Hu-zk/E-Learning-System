import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';
import EditUserModal from '../../EditForm';

function UserList() {

    const [users, setUsers] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    
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
    }, [showEditModal]);

    const handleDelete = async(id) => {
        try {
            const response = await sendRequest({
                route: `/user/admin/delete-user/${id}`,
                method: requestMethods.GET,
            });
            console.log(response)
        } catch (error) {
            console.error('failed:', error);
        }
        console.log(`Delete user with ID: ${id}`);
    };
    
    if (!users) {
        return <p>Loading users...</p>;
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
                        <td className='list-buttons'>
                            <button className='delete-button' onClick={() => handleDelete(users.id)}>Delete</button>
                        </td>
                        <td className='list-buttons'>
                            <button className='edit-button' onClick={() => handleEdit(users.id)}>Edit</button>
                        </td>
                    </tr>
                    
                ))}
                
            </tbody>
        </table>
        {showEditModal && (
        <EditUserModal
            user={selectedUser}
            onClose={handleCloseModal}
        />
        )}
        
    </div>
    )
}

export default UserList