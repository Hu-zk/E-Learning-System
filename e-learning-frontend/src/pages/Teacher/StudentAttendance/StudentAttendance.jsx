import "./style.css"

const StudentAttendance = ({name, id}) => {
    return (
        <label className="student-attendance" htmlFor={id}>
            <div className="name">{name}</div>
            <input type="checkbox" id={id}/>
        </label>
    );
}

export default StudentAttendance