import {Link, useNavigate, useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import StudentAttendance from "../StudentAttendance/StudentAttendance";
import "./Attendance.css"
import {useEffect, useState} from "react";
import axios from "axios";

const Attendance = () => {

    const {id} = useParams()
    let [students,
        setStudents] = useState([])
    let [attendance,
        setAttendance] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const getEnrolledStudents = async() => {
                let {data} = await axios.get(`http://127.0.0.1:8000/api/user/teacher/${id}/students`, {
                    headers: {
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                                "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMTI0MzY5LCJleHAiOjE2OTIxMjc5NjksIm5iZiI6" +
                                "MTY5MjEyNDM2OSwianRpIjoiUVhJV1hNTllNeVJVUEV0WSIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                                "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.rXmmhEnIK5rHMmHsFURR8AEat-wkrqiq" +
                                "VQrAWJbUzeI"
                    }
                });
                setStudents(data.students)

                const initialAttendance = data
                    .students
                    .map((student) => ({studentId: student.id, status: false}));

                setAttendance(initialAttendance)
            };
            getEnrolledStudents();
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleAttendance = async() => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/user/teacher/record-attendance/${id}`, {
                students: attendance
            }, {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                            "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDQ4MTM1LCJleHAiOjE2OTIwNTE3MzUsIm5iZiI6" +
                            "MTY5MjA0ODEzNSwianRpIjoiQ3VnMVo4WDVWSDNTUXAxTiIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                            "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Hswzlu--KVEQcbU44_CJ_Hx0LHFQzDiT" +
                            "D3nSaaV13O8"
                }
            });
            navigate(`/teacher/course/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="attendance">
            <h2>Attendance</h2>
            <Link to={`/teacher/course/${id}`}>
                <button className="back-to-stream">Back to stream</button>
            </Link>
            <div className="students-list">
                {students.length === 0
                    ? (
                        <h1>No Students enrolled</h1>
                    )
                    : (students.map((student) => (<StudentAttendance setAttendance={setAttendance} key={student.id} {...student}/>)))}
            </div>
            <div onClick={handleAttendance} className="save-changes">
                <button>Save Changes</button>
            </div>
        </div>
    );
}

export default Attendance