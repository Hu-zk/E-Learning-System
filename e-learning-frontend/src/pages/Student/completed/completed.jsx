import React, { useContext, useEffect, useState } from "react";
import "./completed.css";
import axios from "axios";
import Course from "../../../components/Student/course/course";
import { AuthContext } from "../../../Context/AuthContext";
// http:127.0.0.1:8000/api/user/shared/completed_courses
function Completed() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [completedCourse, setCompletedCourse] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/shared/completed_courses"
      );
      const data = response.data.data;
      setCompletedCourse(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="card-container">
      {completedCourse.map((ele) => {
        return <Course course={ele} key={ele.id} />;
      })}
    </div>
  );
}

export default Completed;
