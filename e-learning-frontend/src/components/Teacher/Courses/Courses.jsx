import { useEffect, useState } from "react";
import Course from "../Course/Course";
import "./style.css";
import axios from "axios"

const Courses = () => {

  let [courses, setCourses] = useState([])

  useEffect(() => {
    const getCourses = async() => {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/user/teacher/3/courses",
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDMzNjY1LCJleHAiOjE2OTIwMzcyNjUsIm5iZiI6MTY5MjAzMzY2NSwianRpIjoiVVAwbGxjQjVPVnVrd3BsQiIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.05KjCaLFjQ4fVB3gkpeuF_a4nNbVHeH9-m2jXcfxF60`,
          },
        }
      );
      setCourses(response.data.courses)
    }
    getCourses()
  }, [])

  return (
    <div className="courses">
      <h1>Courses</h1>
      <div className="content">
        {courses.map(course => (
          <Course key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
