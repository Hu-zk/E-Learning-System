import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./coursePage.css";
import { AuthContext } from "../../../Context/AuthContext";
import Lecture from "../../../components/Student/lecture/Lecture";
import Quiz from "../../../components/Student/quiz/Quiz";
import BookMeetModal from "../../../components/Student/modal/Modal";
import Modal from "react-modal";

function CoursePage() {
  const jwtToken = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [selectedData, setSelectedData] = useState(null);
  const [type, setType] = useState("");
  const param = useParams();
  const [lectures, setLectures] = useState([]);
  const [thisCourse, setThisCourse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/student/courses"
      );
      let data = await response.data;
      data.data.map((course) => {
        console.log(course);
        if (course.id == param.id) {
          setThisCourse(course);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/shared/${param.id}/content`
      );
      const lectureData = await response.data;
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
    getCourses();
  }, []);

  return (
    <div className="course-page">
      <div className="top">
        <div className="course-name">{thisCourse.name}</div>
        <div className="book-meet" onClick={openModal}>
          Book Meet
        </div>
      </div>
      <BookMeetModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={thisCourse}
      />
      <div className="course-container">
        <div className="title-side">
          {lectures.map((ele, index) => {
            return (
              <div
                className="title"
                key={index}
                onClick={() => {
                  setSelectedData(ele);
                  if (ele.is_announcement == 0) {
                    setType("lecture");
                  } else {
                    setType("quiz");
                  }
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
            <Lecture lectureData={selectedData} />
          ) : (
            <Quiz quizData={selectedData} param={param} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
