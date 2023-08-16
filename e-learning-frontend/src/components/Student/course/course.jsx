import "./course.css";
import { BsThreeDotsVertical, BsFolder } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Course = (props) => {
  const location = useLocation();
    const jwtToken = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  if (location.pathname == "/student/Completed") {
    var { name, assignments_quizzes } = props.course;
    var submissionsTotalGrade = 0;
    var TotalGrade = 0;
    for (const quiz of assignments_quizzes) {
      TotalGrade += quiz.grade;
      if (quiz.submissions.length > 0) {
        submissionsTotalGrade += quiz.submissions[0].grade;
      }
    }
  } else {
    var { name, capacity, enrollments_count, created_at, id } = props.course;
  }
  const enrollCourse = async () => {
    const data = new FormData();
    data.append("course_id", id);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/student/enroll",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="class" onClick={enrollCourse}>
      <div className="top-class">
        <div className="class-title">
          <p>{name}</p>
          <BsThreeDotsVertical size={25} />
        </div>
      </div>
      <div className="mid-complete-class">
        {location.pathname == "/student/Completed" ? (
          assignments_quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz">
              <h4>{quiz.title}</h4>
              <p>
                Grade:
                {quiz.submissions.length > 0
                  ? quiz.submissions[0].grade
                  : "Not graded"}
              </p>
              <style>{".mid-complete-class { padding-top: 120px; }"}</style>
            </div>
          ))
        ) : (
          <div>
            <div>capacity: {capacity}</div>
            <div>{capacity - enrollments_count} seat available</div>
            <div>Launched in {created_at}</div>
          </div>
        )}
      </div>

      <div className="bottom-class">
        {location.pathname == "/student/Completed" ? (
          <>
            <div className="completed-grade">
              <div>
                TOTAL: {submissionsTotalGrade}/{TotalGrade}
              </div>
            </div>
            <div>Completed</div>
          </>
        ) : (
          <div>Enroll</div>
        )}
      </div>
    </div>
  );
};

export default Course;
