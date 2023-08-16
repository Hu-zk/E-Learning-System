import React, { useEffect } from 'react'
import { requestMethods } from '../../../core/enums/requestMethods';
import { sendRequest } from '../../../core/config/request';
import "./style.css"

function Appearance({mode,setMode}) {

    if(mode === "dark"){
        document.documentElement.style.setProperty('--white', "black");
        document.documentElement.style.setProperty('--black', "white");
    }else{
        document.documentElement.style.setProperty('--white', "white");
        document.documentElement.style.setProperty('--black', "black");
    }
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/admin/update-appearance",
                    method: requestMethods.POST,
                    body:{mode},
                });
                console.log(mode)
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
                    <input required type="radio" name="appearance-mode" value="dark" onClick={(e) => setMode(e.target.value)}/>
                    <label htmlFor="Dark">Dark Mode</label>
                </div>

                <div className="label-radio">
                    <input required type="radio" name="appearance-mode" value="light" onClick={(e) => setMode(e.target.value)}/>
                    <label htmlFor="Light">Light Mode</label>
                </div>

            </div>
        </div>
    )
}

export default Appearance