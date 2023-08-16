import { useEffect, useState } from "react";
import Course from "../Course/Course";
import "./style.css";
import axios from "axios"
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";

const Courses = () => {



  let [courses, setCourses] = useState([])

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('userData')).id;
    console.log(user)

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: `/user/teacher/${user}/courses`,
                method: requestMethods.GET,
            });
            setCourses(response.courses)
        } catch (error) {
            console.error('failed:', error);
        }
    }
    fetchData();
  }, []);


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
