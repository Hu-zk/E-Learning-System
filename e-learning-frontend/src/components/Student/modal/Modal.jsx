import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";

function BookMeetModal({ isOpen, onClose, data }) {
  const jwtToken = localStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [inputName, setInputName] = useState("");

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const mysqlFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const BookMeet = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/shared/send_meet`,
        {
          receiver_id: data.teacher_id,
          link_url: inputName,
          date: mysqlFormattedDate,
        }
      );
      const meetdata = response.data;
      console.log(meetdata);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Book Meet Modal"
      className="book-meet-modal"
      overlayClassName="book-meet-overlay">
      <div className="model-style">
        <h2>Book a Meet</h2>
        <input
          type="text"
          placeholder="Enter meet link"
          onChange={handleInputChange}
        />
        <div className="button-meet">
          <button onClick={onClose}>Close</button>
          <button onClick={BookMeet}>Book</button>
        </div>
      </div>
    </Modal>
  );
}

export default BookMeetModal;
