import {Link, useNavigate, useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import StudentAttendance from "../../../components/Teacher/StudentAttendance/StudentAttendance";
import "./Attendance.css"
import {useEffect, useState} from "react";
import axios from "axios";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";

const Attendance = () => {

    const {id} = useParams()
    let [students,
        setStudents] = useState([])
    let [attendance,
        setAttendance] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: `/user/shared/${id}/students`,
                    method: requestMethods.GET,
                });
                console.log(response)
                setStudents(response.students)
                const initialAttendance = response.students.map((student) => ({studentId: student.id, status: false}));

                setAttendance(initialAttendance)

            } catch (error) {
                console.error('failed:', error);
            }
        }
        fetchData();
    }, []);

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
                    Authorization: `Bearer ${token}`,
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