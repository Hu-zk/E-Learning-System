import React, { useState } from 'react';
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';

function CourseForm({onToggle}) {

    const [name, setName] = useState('');
    const [teacher_id, setTeacherId] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleCourseCreation = async (event) => {
        event.preventDefault();

        try {
            const response = await sendRequest({
                route: "/admin/create-course",
                method: requestMethods.POST,
                body:{name,
                    teacher_id,
                    capacity,}
            });
            console.log(response)
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