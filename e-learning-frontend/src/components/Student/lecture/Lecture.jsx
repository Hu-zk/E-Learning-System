import React from "react";
import "./lecture.css";

function Lecture({ lectureData }) {
  console.log(lectureData);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = lectureData.file_url;
    link.download = lectureData.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="lecture-container">
      <h3>{lectureData.title}</h3>
      <p>{lectureData.description}</p>

      {lectureData.file_url ? (
        <>
          <video width="550" height="300" controls>
            <source
              src={`http://127.0.0.1:8000/uploads/Videos/${lectureData.file_url}`}
              type="video/mp4"
            />
          </video>
          <div>
            <button onClick={handleDownload}>Download Video</button>
          </div>
        </>
      ) : (
        <p>No video available for this lecture.</p>
      )}
      <p>Created on: {lectureData.created_at}</p>
    </div>
  );
}

export default Lecture;
