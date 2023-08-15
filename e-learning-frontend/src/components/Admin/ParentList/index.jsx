import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';

function ParentList() {

    const [parents, setParents] = useState('');
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                console.log(response.data)
                setParents(response.data.parents)
            } catch (error) {
                console.error('failed:', error);
            }
        }
    
        fetchData();
    }, []);
    
    console.log('parents:', parents);

    if (!parents) {
        return <p>Loading parents...</p>;
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
                {parents.map((parents,index)=>(
                    <tr key={index}>
                        <td>{parents.id}</td>
                        <td>{parents.name}</td>
                        <td>{parents.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default ParentList