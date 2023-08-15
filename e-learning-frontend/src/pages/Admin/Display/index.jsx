import React from 'react'
import Navbar from '../../../components/Admin/Navbar'

function Display() {
    const nav={"title":'Display :',"content":['Courses','All Users','Students','Teachers','Parents']} 

    return (
        <Navbar nav={nav} />
    )
}

export default Display