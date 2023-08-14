import {useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import StudentAttendance from "../StudentAttendance/StudentAttendance";
import "./Attendance.css"
import {useEffect, useState} from "react";
import axios from "axios";

const Attendance = () => {

    const {id} = useParams()
    let [students,
        setStudents] = useState([])

    useEffect(() => {
        try {
            const getEnrolledStudents = async() => {
                let response = await axios.get(`http://127.0.0.1:8000/api/user/teacher/${id}/students`, {
                    headers: {
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                                "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDQzNDQyLCJleHAiOjE2OTIwNDcwNDIsIm5iZiI6" +
                                "MTY5MjA0MzQ0MiwianRpIjoicjEzaUJhckNkZG5jeTRRYyIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                                "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.dL-29P-M6IlwVW5FGoSO13CW3DRuiJOC" +
                                "HGlxmvIZ_XM"
                    }
                });
                console.log(response.data.students)
                setStudents(response.data.students)
            };
            getEnrolledStudents();
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="attendance">
            <h2>Attendance</h2>
            <div className="students-list">
                {students.length === 0
                    ? (
                        <h1>No Students enrolled</h1>
                    )
                    : (students.map((student) => (<StudentAttendance key={student.id} {...student}/>)))}
            </div>
            <div className="save-changes">
                <button>Save Changes</button>
            </div>
        </div>
    );
}

export default Attendance