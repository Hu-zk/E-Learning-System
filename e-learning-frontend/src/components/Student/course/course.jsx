import "./course.css";
import { BsThreeDotsVertical, BsFolder } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Course = (props) => {
  const location = useLocation();
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
    var { name, capacity, enrollments_count, created_at } = props.course;
  }

  return (
    <div className="class">
      <div className="top-class">
        <div className="class-title">
          <p>{name}</p>
          <BsThreeDotsVertical size={25} />
        </div>
      </div>
      <div className="mid-class">
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
              <style>{".class .mid-class { padding-top: 80px; }"}</style>
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
