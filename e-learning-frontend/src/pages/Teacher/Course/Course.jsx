import Announcement from "../../../components/Teacher/Announcement/Announcement";
import "./style.css"

const Course = () => {
    return (
        <div className="teacher-course-page">
            <div className="buttons">
                <div>
                    <button>Announce</button>
                </div>
                <div>
                    <button>Upload Materials</button>
                </div>
            </div>
            <div className="course-name">Course One</div>
            <div className="stream">
                <div className="left-stream">
                    <Announcement />
                    <div className="content">

                    </div>
                </div>
                <div className="right-stream">
                    <div className="attendance">
                        <h4>Attendance</h4>
                        <button>Manage Attendance</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course