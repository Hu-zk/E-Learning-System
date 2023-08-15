import React, {useEffect, useState} from "react";
import "./style.css"
import {GrClose} from "react-icons/gr"
import axios from "axios"
import {useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import SubmittedStudent from "../../../components/Teacher/SubmittedStudent/SubmittedStudent";

const Grades = () => {

    const {assignmentId} = useParams()

    let [isFeedbackOpened,
        setIsFeedbackOpened] = useState(false)
    let [assignmentData,
        setAssignmentData] = useState([])
    let [solution,
        setSolution] = useState(null)

    console.log(assignmentData)

    useEffect(() => {
        try {
            const getAssignmentData = async() => {
                let {data} = await axios.get(`http://127.0.0.1:8000/api/user/teacher/${assignmentId}`, {
                    headers: {
                        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                                "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDg5NTUxLCJleHAiOjE2OTIwOTMxNTEsIm5iZiI6" +
                                "MTY5MjA4OTU1MSwianRpIjoiNnpZNHJTWUV0NGU1QjJaOCIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                                "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.mAZmqqIRS3sKgJaflbbo8Rl8YPWfHCXc" +
                                "MGEMMLmfucY"
                    }
                });
                setAssignmentData(data.assignment)
            };
            getAssignmentData();
        } catch (error) {
            console.log(error)
        }
    }, [])

    // const handleFileInput = (e) => {     const fileType = e.target.files[0].type;
    //     setFile(URL.createObjectURL(e.target.files[0]))
    // fileType.startsWith("image/")         ? setFileType("image")         :
    // setFileType("pdf"); }

    // let fileType = solution.file_url

    return (
        <div className="grades">
            <div className="top-grades">
                <div className="left">
                    <div className="assignment-points">
                        {assignmentData
                            ?.grade}
                        points
                    </div>
                </div>
                <div className="right">
                    {assignmentData
                        ?.count_student
                            ?.submitted_students_count}
                    Turned in /{" "} {assignmentData
                        ?.count_student
                            ?.not_submitted_students_count}
                    Assigned
                </div>
            </div>
            <div className="bottom-grades">
                <div className="left">
                    {assignmentData && assignmentData
                        ?.submitted_students
                            ? (assignmentData.submitted_students.map((student, index) => (<SubmittedStudent
                                key={index}
                                grade={assignmentData
                                ?.grade}
                                student={student}
                                setSolution={setSolution}/>)))
                            : (
                                <p>Loading or no data available</p>
                            )}
                </div>
                <div className="right">
                    {solution && (
                        <React.Fragment>
                            <div>
                                <div className="name">{solution.student.name}</div>
                                <div className="grade-input">
                                    <input type="text"/>
                                    /{assignmentData?.grade}
                                </div>
                            </div>
                            <button className="give-feedback" onClick={(e) => setIsFeedbackOpened(true)}>
                                Give Feedbak
                            </button>
                            {isFeedbackOpened && (
                                <div className="feedback">
                                    <textarea placeholder="Provide a feedback" cols="20" rows="10"></textarea>
                                    <div className="close">
                                        <GrClose size={20} onClick={(e) => setIsFeedbackOpened(false)}/>
                                    </div>
                                </div>
                            )}
                            <div className="submit-grade">Submit</div>
                            <img src="" alt=""/>{" "} {solution.file_url === "image"
                                ? (<img src={solution.file_url}/>)
                                : (<iframe src={solution.file_url} alt=""/>)}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Grades