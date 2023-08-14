import React, { useEffect, useState } from "react";
import MyResponsivePie from "../../../components/Student/ResponsivePie/ResponsivePie";
import "./style.css";
import axios from "axios";

function Inprogress() {
  const [progress, setProgress] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/shared/course_stats"
      );
      const data = response.data.data;
      setProgress(data);
      processCourseData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const processCourseData = (courses) => {
    const updatedCourseData = courses.map((course) => {
      let courseData = {
        name: course.name,
        attandence: 0,
        absent: 0,
        submited: 0,
        notSumbited: 0,
      };

      course.attendance_by_student.forEach((attendance) => {
        if (attendance.status === 1) {
          courseData.attandence++;
        } else {
          courseData.absent++;
        }
      });

      course.assignments_quizzes.forEach((assignment) => {
        if (assignment.submissions_count === 1) {
          courseData.submited++;
        } else {
          courseData.notSumbited++;
        }
      });

      return courseData;
    });

    setCourseData(updatedCourseData);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="progress">
      {courseData.map((course, index) => (
        <div key={index} className="chart">
          <div className="right-side">
            <h3>{course.name}</h3>
            <button className="courseBtn">Enter course</button>
          </div>
          <div className="responsivePie">
            <MyResponsivePie
              data={[
                {
                  id: "attandence",
                  label: "Attendance",
                  value: course.attandence,
                  color: "hsl(36, 70%, 50%)",
                },
                {
                  id: "absent",
                  label: "Absent",
                  value: course.absent,
                  color: "hsl(262, 70%, 50%)",
                },
                {
                  id: "Submited",
                  label: "Submitted",
                  value: course.submited,
                  color: "hsl(185, 70%, 50%)",
                },
                {
                  id: "Not Submited",
                  label: "Not Submitted",
                  value: course.notSumbited,
                  color: "hsl(121, 70%, 50%)",
                },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inprogress;
