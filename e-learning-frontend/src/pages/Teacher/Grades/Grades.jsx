import React, {useEffect, useState} from "react";
import "./style.css"
import {GrClose} from "react-icons/gr"
import axios from "axios"
import {Link, useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import SubmittedStudent from "../../../components/Teacher/SubmittedStudent/SubmittedStudent";

const Grades = () => {

    const {assignmentId} = useParams()

    let [isFeedbackOpened,
        setIsFeedbackOpened] = useState(false)
    let [assignmentData,
        setAssignmentData] = useState([])
    let [solution,
        setSolution] = useState(null)
    let [grade,
        setGrade] = useState("")
    let [feedback,
        setFeedback] = useState("")
    const {id} = useParams()

    useEffect(() => {
        try {
            const token = localStorage.getItem("jwtToken");
            const getAssignmentData = async() => {
                let {data} = await axios.get(`http://127.0.0.1:8000/api/user/teacher/${assignmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(data)
                setAssignmentData(data.assignment)
            };
            getAssignmentData();
        } catch (error) {
            console.log(error)
        }
    }, [solution, assignmentId])

    // const handleFileInput = (e) => {     const fileType = e.target.files[0].type;
    //     setFile(URL.createObjectURL(e.target.files[0]))
    // fileType.startsWith("image/")         ? setFileType("image")         :
    // setFileType("pdf"); } let fileType = solution.file_url

    const handleGradeChange = (e) => {
        if (!isNaN(e.target.value)) {
            setGrade(e.target.value)
        }
    }

    const handleSubmitGrade = async(e) => {
        try {
            let body = {
                grade,
                feedback,
                submission_id: solution.id
            }
            let {data} = await axios.post("http://127.0.0.1:8000/api/user/teacher/update-submission", body, {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                            "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDk3MjA3LCJleHAiOjE2OTIxMDA4MDcsIm5iZiI6" +
                            "MTY5MjA5NzIwNywianRpIjoiYlBCYzVRV1pjVGVhQUVSWSIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                            "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.stJUYkfQ_G4Y8TExcUbdVCOROC5kaZYB" +
                            "3BBgjIWFNzc"
                }
            });
            if (solution.id === data.data.id) {
                setSolution(data.data)
                if (solution.feedback) {
                    setIsFeedbackOpened(true)
                }
            }
            setGrade("")
            setFeedback("")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(solution)

    return (
      <div className="grades">
        <div className="top-grades">
          <div className="left">
            <div className="assignment-points">
              {assignmentData?.grade}
              points
            </div>
          </div>
          <div className="right">
            {assignmentData?.count_student?.submitted_students_count}
            Turned in /{" "}
            {assignmentData?.count_student?.not_submitted_students_count}
            Assigned
          </div>
        </div>
        <Link to={`/teacher/course/${id}`}>
          <button className="back-to-stream">Back to stream</button>
        </Link>
        <div className="bottom-grades">
          <div className="left">
            {assignmentData && assignmentData?.submitted_students ? (
              assignmentData.submitted_students.map((student, index) => (
                <SubmittedStudent
                  key={index}
                  solution={solution}
                  grade={assignmentData?.grade}
                  student={student}
                  setSolution={setSolution}
                  setIsFeedbackOpened={setIsFeedbackOpened}
                />
              ))
            ) : (
              <p>Loading or no data available</p>
            )}
          </div>
          <div className="right">
            {solution && (
              <React.Fragment>
                <div>
                  <div className="name">{solution.student.name}</div>
                  <div className="grade-input">
                    <input
                      disabled={solution.grade}
                      value={solution.grade ? solution.grade : grade}
                      onChange={handleGradeChange}
                      type="text"
                    />
                    /{assignmentData?.grade}
                  </div>
                </div>
                {!solution.grade && (
                  <button
                    className="give-feedback"
                    onClick={(e) => setIsFeedbackOpened(true)}
                  >
                    Give Feedbak
                  </button>
                )}
                {isFeedbackOpened && (
                  <div className="feedback">
                    <textarea
                      disabled={solution.feedback}
                      value={solution.feedback ? solution.feedback : feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide a feedback"
                      cols="20"
                      rows="10"
                    ></textarea>
                    {!solution.feedback && (
                      <div className="close">
                        <GrClose
                          size={20}
                          onClick={(e) => setIsFeedbackOpened(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
                {!solution.grade && (
                  <div onClick={handleSubmitGrade} className="submit-grade">
                    Submit
                  </div>
                )}
                <img src="" alt="" />{" "}
                {solution.file_url === "image" ? (
                  <img src={solution.file_url} />
                ) : (
                  <iframe src={solution.file_url} alt="" />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
}

export default Grades;