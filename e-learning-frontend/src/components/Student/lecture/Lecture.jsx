import React from "react";
import "./lecture.css";

function Lecture({ lectureData }) {
  console.log(lectureData);

  return (
    <div className="lecture-container">
      <h3>{lectureData.title}</h3>
      <p>{lectureData.description}</p>

      {lectureData.file_url ? (
        <video controls>
          <source src={lectureData.file_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available for this lecture.</p>
      )}

      <p>Created on: {lectureData.created_at}</p>
    </div>
  );
}

export default Lecture;
