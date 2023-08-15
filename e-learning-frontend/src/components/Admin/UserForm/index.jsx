import React, { useState } from 'react';
import "./style.css"
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';


function UserForm({onToggle}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [parent_id, setParentId] = useState();
    const [user_type_id, setUserTypeId] = useState();

    const handleUserCreation = async (event) => {
        event.preventDefault();

        // const response = await axios.post('http://127.0.0.1:8000/api/user/admin/create-user', {
        try {
            if (password === confirmPassword) {
                const response = await sendRequest({
                    route: "/admin/create-user",
                    method: requestMethods.POST,
                    body:{name,
                        parent_id,
                        email,
                        password,
                        user_type_id,}
                });
                console.log(response)
            }
        } catch (error) {
            console.error('failed:', error);
        }
    };

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Create User
                    </h1>
                </div>

                <form className="create-form ">

                        <div className="label-input">
                            <label htmlFor="name">Name </label>
                            <input id="name" name="name" type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>


                        <div className="label-input">
                            <label htmlFor="email">Email </label>
                            <input id="email" name="email" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="password">Password </label>
                            <input id="password" name="password" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="check-password">Confirm</label>
                            <input id="check-password" name="check-password" type="password" required placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) }/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="parent_id">Parent</label>
                            <input id="parent_id" name="parent_id" type="number" placeholder="parent_id" value={parent_id} onChange={(e) => setParentId(e.target.value)}/>
                        </div>
                    <div className="user-type">
                        <h4>User Type :</h4>

                        <div className="types">
                            <div className="label-radio">
                                <input required type="radio" name="user_type_id" value="4" onClick={(e) => setUserTypeId(e.target.value)}/>
                                <label htmlFor="student">Student</label>
                            </div>

                            <div className="label-radio">
                                <input required type="radio" name="user_type_id" value="2" onClick={(e) => setUserTypeId(e.target.value)}/>
                                <label htmlFor="teacher">Teacher</label>
                            </div>

                            <div className="label-radio">
                                <input required type="radio" name="user_type_id" value="3" onClick={(e) => setUserTypeId(e.target.value)}/>
                                <label htmlFor="teacher">Parent</label>
                            </div>
                        </div>
                    </div>

                    <button className='black-button' type="submit" onClick={handleUserCreation}>Create</button>
                </form>


                <div className="bottom-form">
                    <p>Create Course?</p>
                    <span className='create-toggle' onClick={() => onToggle(false)}>Course </span>
                </div>
            </div>
    )
}

export default UserForm