import React, { useState } from "react";
import "./quiz.css";

function Quiz({ quizData }) {
  console.log(quizData);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

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
        <div className="inputfile">
          <label htmlFor="submit" className="submitBtn">
            Submit
          </label>
          <input type="file" id="submit" onChange={handleFileUpload} />
        </div>
      </div>
      <p>Created on: {quizData.created_at.split("T")[0]}</p>
    </div>
  );
}

export default Quiz;
