import {Outlet} from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./style.css"

const TeacherLayout = () => {
    return (
        <div className="teacher-layout app dark">
            <Sidebar/>
            <div className="outlet">
                <Outlet/>
            </div>
        </div>
    )
}

export default TeacherLayout