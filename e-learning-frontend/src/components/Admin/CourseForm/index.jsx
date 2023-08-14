import React, { useState } from 'react';
import axios from 'axios';

function CourseForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            if (password === confirmPassword) {
                
                const response = await axios.post('http://127.0.0.1:8000/api/register', {
                    name,
                    username,
                    email,
                    password,
                });
                console.log(response.data)
                window.location.href='http://localhost:3000/'
            }else{
                console.log("wrong pass")
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="body-container">
            <div className="container">
                <div className="form-header">
                    <h1>
                        Sign Up
                    </h1>
                </div>

                <form id="form">
                    <div className="user-info">

                        <div className="label-input">
                            <label htmlFor="name">Name </label>
                            <input id="name" name="name" type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="username">Username</label>
                            <input id="username" name="username" type="text" required placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
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
                            <label htmlFor="check-password">Confirm Pass </label>
                            <input id="check-password" name="check-password" type="password" required placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) }/>
                        </div>
                    </div>

                    <button type="submit" id="sign-up" onClick={handleLogin}>Sign Up</button>
                </form>

                <div className="bottom-form">
                    <p>Already have an account?</p>

                    <a href='./'>LogIn </a>
                </div>
            </div>
        </div>
    )
}

export default CourseForm