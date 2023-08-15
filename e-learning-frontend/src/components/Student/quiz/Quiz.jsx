import React, { useEffect, useState } from "react";
import "./quiz.css";
import axios from "axios";

function Quiz({ quizData }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };
  const submitData = async () => {
    const data = new FormData();
    data.append("file", uploadedFile);
    data.append("assignment_id", quizData.id);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/student/upload-submission",
        data
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {});
  return (
    <div className="quiz-container">
      <div className="quizinfo">
        <h3>{quizData.title}</h3>
        <p>Deadline: {quizData.deadline}</p>
        <p>Grade: {quizData.grade}</p>
      </div>
      <p>{quizData.description}</p>
      <div className="file">
        {quizData.file_url ? (
          <div>
            <a
              href={quizData.file_url}
              target="_blank"
              rel="noopener noreferrer">
              {quizData.title} - File
            </a>
          </div>
        ) : (
          <p>No file available for this quiz.</p>
        )}
        <div className="buttonquiz">
          <div className="inputfile">
            <label htmlFor="submit" className="submitBtn">
              Upload
            </label>
            <input type="file" id="submit" onChange={handleFileUpload} />
          </div>
          <div className="SubmitBtn" onClick={submitData}>
            submit
          </div>
        </div>
      </div>
      <p>Created on: {quizData.created_at.split("T")[0]}</p>
    </div>
  );
}

export default Quiz;
