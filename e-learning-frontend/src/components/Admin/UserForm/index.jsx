import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"


function UserForm({onToggle}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [parent_id, setParentId] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            if (password === confirmPassword) {
                
                const response = await axios.post('http://127.0.0.1:8000/api/register', {
                    name,
                    parent_id,
                    email,
                    password,
                });
                console.log(response.data)
            }else{
                console.log("wrong pass")
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
                    <div class="user-type">
                        <h4>User Type :</h4>

                        <div class="types">
                            <div class="label-radio">
                                <input required type="radio" name="type" value="4"/>
                                <label for="student">Student</label>
                            </div>

                            <div class="label-radio">
                                <input required type="radio" name="type" value="2"/>
                                <label for="teacher">Teacher</label>
                            </div>

                            <div class="label-radio">
                                <input required type="radio" name="type" value="3"/>
                                <label for="teacher">Parent</label>
                            </div>
                        </div>
                    </div>

                    <button className='black-button' type="submit" onClick={handleLogin}>Create</button>
                </form>


                <div className="bottom-form">
                    <p>Create Course?</p>
                    <span className='create-toggle' onClick={() => onToggle(false)}>Course </span>
                </div>
            </div>
    )
}

export default UserForm