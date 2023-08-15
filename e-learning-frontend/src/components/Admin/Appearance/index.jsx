import React, { useState } from 'react'
import "./style.css"

function Appearance() {

    const [mode, setMode] = useState();
    console.log(mode)

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