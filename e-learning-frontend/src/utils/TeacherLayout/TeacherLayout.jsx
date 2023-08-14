import {Outlet} from "react-router-dom"
import "./style.css"
import Sidebar from "../../components/Sidebar/Sidebar";

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