import StudentAttendance from "../StudentAttendance/StudentAttendance";
import "./Attendance.css"

const Attendance = () => {
    return (
        <div className="attendance">
            <h2>Attendance</h2>
            <div className="students-list">
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
                <StudentAttendance/>
            </div>
            <div className="save-changes">
                <button>Save Changes</button>
            </div>
        </div>
    );
}

export default Attendance