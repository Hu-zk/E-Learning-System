import React, { useEffect, useState } from "react";
import InProgressCourse from "../../../components/Student/InProgressCourse/InProgressCourse";
import { useLocation } from "react-router-dom";
import MyResponsivePie from "../../../components/Student/ResponsivePie/ResponsivePie";
import "./style.css";
import axios from "axios";

function Inprogress() {
  const [progress, setProgress] = useState([]);
  const [attandence, setAttandence] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [submited, setSubmited] = useState(0);
  const [notSumbited, setNotSumbited] = useState(0);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/shared/course_stats"
      );
      const data = await response.data;
      setProgress(data.data);
      fiterData();
    } catch (error) {
      console.error(error);
    }
  };
  const fiterData = () => {
    progress.map((data) => {
      if (data.attendance_by_student.length != 0) {
        if (data.attendance_by_student.status == 1) {
          setAttandence(attandence + 1);
        } else {
          setAbsent(absent + 1);
        }
      }
      if (data.assignments_quizzes.length != 0) {
        if (data.assignments_quizzes.submissions_count == 1) {
          setSubmited(submited + 1);
        } else {
          setNotSumbited(notSumbited + 1);
        }
      }
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const data = [
    {
      id: "attandence",
      label: "attandence",
      value: 555,
      color: "hsl(36, 70%, 50%)",
    },
    {
      id: "absent",
      label: "absent",
      value: 444,
      color: "hsl(262, 70%, 50%)",
    },
    {
      id: "Submited",
      label: "Submited",
      value: 888,
      color: "hsl(185, 70%, 50%)",
    },
    {
      id: "Not Submited",
      label: "Not Submited",
      value: 666,
      color: "hsl(121, 70%, 50%)",
    },
  ];
  return (
    <div className="chart">
      <MyResponsivePie data={data} />
    </div>
  );
}

export default Inprogress;
