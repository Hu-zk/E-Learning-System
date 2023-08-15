import { useEffect, useState } from "react";
import Course from "../Course/Course";
import "./style.css";
import axios from "axios"

const Courses = () => {

  let [courses, setCourses] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    const getCourses = async() => {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/user/teacher/3/courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
