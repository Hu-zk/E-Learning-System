import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./coursePage.css";
import { AuthContext } from "../../../Context/AuthContext";
import Lecture from "../../../components/Student/lecture/Lecture";
import Quiz from "../../../components/Student/quiz/Quiz";

function CoursePage() {
  const { userData } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  const [type, setType] = useState("");
  const param = useParams();
  //   const [data, setData] = useState([]);
  const [lectures, setLectures] = useState([]);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/shared/${param.id}/content`
      );
      const lectureData = await response.data;
      //   setData(lectureData.content);
      setLectures([
        ...lectureData.content.materials,
        ...lectureData.content.assignments,
        ...lectureData.content.quizzes,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  lectures.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="course-page">
      <h2 className="course-name">CourseName</h2>
      <div className="course-container">
        <div className="title-side">
          {lectures.map((ele, index) => {
            return (
              <div
                className="title"
                key={index}
                onClick={() => {
                  if (ele.is_announcement == 0) {
                    setType("lecture");
                  } else {
                    setType("quiz");
                  }
                  console.log(type);
                  console.log("type");
                }}>
                {ele.title}
              </div>
            );
          })}
        </div>
        <div className="contentSide">
          {type == "" ? (
            <div>wlecome</div>
          ) : type == "lecture" ? (
            <Lecture />
          ) : (
            <Quiz />
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
