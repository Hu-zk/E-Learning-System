import React, { useContext, useEffect, useState } from "react";
import Course from "../course/course";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import "./courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

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

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="card-container">
      {courses.map((ele) => {
        return <Course course={ele} />;
      })}
    </div>
  );
}

export default Courses;
