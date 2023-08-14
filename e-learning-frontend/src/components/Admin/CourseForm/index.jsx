import React, { useState } from 'react';
import axios from 'axios';

function CourseForm({onToggle}) {

    const [name, setName] = useState('');
    const [teacher_id, setTeacherId] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleCourseCreation = async (event) => {
        event.preventDefault();

        try {

              // const response = await axios.post('http://127.0.0.1:8000/api/user/admin/create-user', {
                const response = await axios.post('http://127.0.0.1:8000/api/admin/create-course', {
                name,
                teacher_id,
                capacity,
            });
            console.log(response.data)

        } catch (error) {
            console.error('failed:', error);
        }
    };

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Create Course
                    </h1>
                </div>

                <form className='create-form '>
                    <div className="user-info">

                        <div className="label-input">
                            <label htmlFor="name">Name </label>
                            <input id="name" name="name" type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="teacher_id">Teacher</label>
                            <input id="teacher_id" name="teacher_id" type="number" placeholder="teacher_id" value={teacher_id} onChange={(e) => setTeacherId(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="capacity">Capacity</label>
                            <input id="capacity" name="capacity" type="number" placeholder="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>
                        </div>

                    </div>

                    <button className='black-button' type="submit" onClick={handleCourseCreation}>Create</button>
                </form>

                <div className="bottom-form">
                    <p>Add User?</p>
                    <span className='create-toggle' onClick={() => onToggle(true)}>User </span>
                </div>
            </div>
    )
}

export default CourseForm