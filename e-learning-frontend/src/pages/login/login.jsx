import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../../services/api';
import "../Admin/Create/style.css"
import "./style.css"

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); 

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/guest/login', {
                email,
                password,
            });
            const token  = response.data.user.token;
            const data  = response.data.user;
            console.log(data)
            if (token) {
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userData', JSON.stringify(data));
                setAuthToken(token);            
                window.location.href='http://localhost:3000/parent/Home'

            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
            
            <div className="login-page-container">
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Log In
                    </h1>
                </div>

                <form id="form" >

                    <div className="user-info">

                        <div className="label-input">

                            <label htmlFor="email">Email </label>
                            <input id="email" name="email" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="label-input">

                            <label htmlFor="password">Password </label>
                            <input id="password" name="password" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <button className='black-button' type="submit" id="sign-up" onClick={handleLogin} >Log In</button>
                </form>

            </div>
            </div>
    )
}

export default Login