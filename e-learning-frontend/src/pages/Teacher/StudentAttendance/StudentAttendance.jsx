import "./style.css"

const StudentAttendance = () => {
    return (
        <label className="student-attendance" htmlFor="student1">
            <div className="name">Mohammad Hussein</div>
            <input type="checkbox" id="student1"/>
        </label>
    );
}

export default StudentAttendance