import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';
import "./style.css"

function Appearance() {

    const [mode, setMode] = useState();
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    // route: "/user/admin/get-users",
                    method: requestMethods.GET,
                });
                console.log(response)
            } catch (error) {
                console.error('failed:', error);
            }
        }
        fetchData();
    }, [mode]);


    return (
        <div className="appearance-container">
            <h3>Appearance :</h3>

            <div className="modes">
                <div className="label-radio">
                    <input required type="radio" name="appearance-mode" value="0" onClick={(e) => setMode(e.target.value)}/>
                    <label htmlFor="Dark">Dark Mode</label>
                </div>

                <div className="label-radio">
                    <input required type="radio" name="appearance-mode" value="1" onClick={(e) => setMode(e.target.value)}/>
                    <label htmlFor="Light">Light Mode</label>
                </div>

            </div>
        </div>
    )
}

export default Appearance