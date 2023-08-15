import React from 'react'
import "./style.css"

function Navbar({nav}) {
    return (
        <div className='admin-nav'>
            <span className='admin-page-title'>{nav.title}</span>
            <div className='admin-nav-content-container'>
                    {nav.content.map((content,index)=>(
                        <div className='admin-nav-content' key={index} onClick={content.onclick}>{content.title}</div>
                    ))}
            </div>
        </div>
    )
}

export default Navbar