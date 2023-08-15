import {Link, useNavigate, useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import StudentAttendance from "../../../components/Teacher/StudentAttendance/StudentAttendance";
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
                let { data } = await axios.get(
                  `http://127.0.0.1:8000/api/user/teacher/${id}/students`,
                  {
                    headers: {
                      Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMTQxOTI2LCJleHAiOjE2OTIxNDU1MjYsIm5iZiI6MTY5MjE0MTkyNiwianRpIjoibUpZRDV1MlhLUm5ObWlDaiIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.HtKyULCx8uce-pGrrcpQFaqA2JCdbClcYGHCNYP2hNY",
                    },
                  }
                );
                console.log(data)
                setStudents(data.students)
                console.log(data.students)

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
            const token = localStorage.getItem("jwtToken")
            await axios.post(
              `http://127.0.0.1:8000/api/user/teacher/record-attendance/${id}`,
              {
                students: attendance,
              },
              {
                headers: {
                  Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMTQxNjIyLCJleHAiOjE2OTIxNDUyMjIsIm5iZiI6MTY5MjE0MTYyMiwianRpIjoiVkZBSHNRTlJiVDBENm9mcyIsInN1YiI6IjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.0tUvSifCvUG7_UrZCqOYSAfjVHCimPVRO4ZiMQGDbgU`,
                },
              }
            );
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
                {students?.length === 0
                    ? (
                        <h1>No Students enrolled</h1>
                    )
                    : (students?.map((student) => (<StudentAttendance setAttendance={setAttendance} key={student?.id} {...student}/>)))}
            </div>
            <div onClick={handleAttendance} className="save-changes">
                <button>Save Changes</button>
            </div>
        </div>
    );
}

export default Attendance