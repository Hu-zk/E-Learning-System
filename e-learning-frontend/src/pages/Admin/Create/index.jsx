import React, { useState } from 'react'
import UserForm from '../../../components/Admin/UserForm';
import CourseForm from '../../../components/Admin/CourseForm';
import './style.css';

function Create() {
    const[createUser,setCreateUser] = useState(true);
    // const[UserTitle,setUserTitle] = useState();
    // const[CourseTitle,setCourseTitle] = useState();

    return (
        <div className='create-page-container'>
            {createUser ? (<UserForm onToggle={() => setCreateUser(false)}/>) : (<CourseForm  onToggle={() => setCreateUser(true)}/>)}
        </div>
    )
}

export default Create