import React from "react";
import axios from 'axios';
import styles from  './card.module.css';
import {BsCameraVideoFill} from "react-icons/bs";
import {GrFormClose} from "react-icons/gr";

export const Card = ({name,link,id}) =>{
    console.log("my id is", id)

    const goToMeet = () => {
        window.location.href = `${link}`
    }

    const deleteMeeting = async () => {
        const body = {
            id: id
        }
        console.log("inner id", id)
        const token = localStorage.getItem('jwtToken');
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/user/shared/remove_meet/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    }

    return(
        <div className={styles.container}>
            <div className={styles.card_body}>
                <div className={styles.name}>{name}</div>
                <div className={styles.icon}>
                    <BsCameraVideoFill onClick={()=>goToMeet()}/>
                </div>
            </div>
            <div className={styles.close}>
                <div className={styles.clickable}>
                    <GrFormClose onClick={()=>deleteMeeting()}/>
                </div>
            </div>
        </div>
    )
}