import "./style.css"

const StudentAttendance = ({name, id, setAttendance}) => {

    const handleChange = (e) => {
        if (e.target.checked) {
            setAttendance(prev => prev.map(student => {
                if (student.studentId === id) {
                    return {studentId: id, status: true}
                } else {
                    return student
                }
            }))
        } else {
            setAttendance((prev) => prev.map((student) => {
                if (student.studentId === id) {
                    return {studentId: id, status: false};
                } else {
                    return student;
                }
            }));
        }
    }

    return (
        <label className="student-attendance" htmlFor={id}>
            <div className="name">{name}</div>
            <input onChange={handleChange} type="checkbox" id={id}/>
        </label>
    );
}

export default StudentAttendance