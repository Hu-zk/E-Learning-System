import React, { useState } from 'react';
import { sendRequest } from '../../../core/config/request';
import { requestMethods } from '../../../core/enums/requestMethods';

function EditUserModal({ user, onClose, onUpdate }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    console.log(user);

    const handleUserEdit = async (event) => {
        event.preventDefault();

        try {
            if (password === confirmPassword) {
                const response = await sendRequest({
                    route: `/user/admin/update-user/${user}`,
                    method: requestMethods.POST,
                    body:{
                        name,
                        email,
                        password,
                    }
                });
                console.log(response)
            }
        } catch (error) {
            console.error('failed:', error);
        }
        onClose();
    };

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Edit User
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
                        </div> <br />

                    <button className='black-button' type="submit" onClick={handleUserEdit}>Update</button> <br />
                    <button className='black-button' type="button" onClick={onClose}>Cancel</button>

                </form>
            </div>
    )
}


export default EditUserModal;
