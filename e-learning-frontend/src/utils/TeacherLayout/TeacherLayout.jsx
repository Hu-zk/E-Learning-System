import {Outlet} from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./style.css"

const TeacherLayout = () => {
    return (
        <div className="teacher-layout">
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default TeacherLayout