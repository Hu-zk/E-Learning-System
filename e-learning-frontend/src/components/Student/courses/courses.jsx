import React, { useContext, useEffect, useState } from "react";
import Course from "../course/course";
import axios from "axios";
import "./courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  const getCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/student/courses"
      );
      let data = await response.data;
      setCourses(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getEnrollerCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/student/enrolled_courses"
      );
      let data = await response.data;
      setEnrolledCourses(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const enrolledCourseIds = enrolledCourses?.map((course) => course.id);
  const filteredCourses = courses?.filter(
    (course) => !enrolledCourseIds.includes(course.id)
  );

  useEffect(() => {
    getCourses();
    getEnrollerCourses();
  }, []);
  return (
    <div className="card-container">
      {filteredCourses?.map((ele) => {
        return <Course course={ele} key={ele.id} />;
      })}
    </div>
  );
}

export default Courses;
