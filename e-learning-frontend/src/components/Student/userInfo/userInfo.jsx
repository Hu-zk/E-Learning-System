import React, { useEffect, useState } from "react";
import styles from "./userInfo.module.css";
import axios from "axios";
import { BsCameraVideoFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
export const Profile = () => {
  const [meeting, setMeeting] = useState(false);
  const [sendMeetData, setSendMeetData] = useState([]);
  const [receiveMeetData, setReceiveMeetData] = useState([]);

  const user_data = localStorage.getItem("userData");
  const user_info = JSON.parse(user_data);

  const getMeeting = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get(
      "http://127.0.0.1:8000/api/user/shared/get_parent",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    setSendMeetData(data.send);
    setReceiveMeetData(data.receive);
    if (data.message == "No meeting") {
      setMeeting(false);
    } else {
      setMeeting(true);
    }
  };

  useEffect(() => {
    getMeeting();
  }, []);

  return (
    <div className={styles.contaier}>
      <div className={styles.container_header}>
        <div className={styles.header}>
          <div className={styles.image_container}>
            <img src="/image.jpg" alt="user profile image" />
          </div>
          <div className={styles.user_name}>{user_info.name}</div>
        </div>
        <div className={styles.user_details}>
          <div className={styles.details}>{user_info.email}</div>
        </div>
      </div>
      <div className={styles.meet_container}>
        <div className={styles.card_title}>Scheduled meetings:</div>
        {meeting ? (
          <>
            {sendMeetData?.map((ele) => {
              return (
                <div className={styles.container} key={ele.id}>
                  <div className={styles.card_body}>
                    <div className={styles.name}>{ele.receiver_meet.name}</div>
                    <div className={styles.icon}>
                      <BsCameraVideoFill />
                    </div>
                  </div>
                </div>
              );
            })}
            {receiveMeetData.map((ele) => {
              return (
                <div className={styles.container} key={ele.id}>
                  <div className={styles.card_body}>
                    <div className={styles.name}>{ele.receiver_meet.name}</div>
                    <div className={styles.icon}>
                      <BsCameraVideoFill />
                    </div>
                  </div>
                  <div className={styles.close}>
                    <div className={styles.clickable}>
                      <GrFormClose />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.meeting_message}>no meetings scheduled</div>
        )}
      </div>
    </div>
  );
};
