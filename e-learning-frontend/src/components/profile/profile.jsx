import React, { useEffect, useState } from "react";
import styles from './profile.module.css';
import { Card } from "../meet_card/card";
import axios from 'axios';
import { ChildCard } from "../child_card/childCard";

export const Profile = () =>{
    const [meeting, setMeeting] = useState(false);

    const getData = async () => {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/get_parent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // const data = response.data.message;
        const data = response.data;
        if(data.message == 'No meeting'){
            setMeeting(false);
            console.log("user has no meetings");
        }else{
            setMeeting(true);
        }
        // console.log(data);
    }

    // useEffect(()=>{
        getData();
    // })

    return(
        <div className={styles.contaier}>
            <div className={styles.container_header}>
                <div className={styles.header}>
                    <div className={styles.image_container}>
                        <img src="/image.jpg" alt="user profile image"/>
                    </div>
                    <div className={styles.user_name}>name</div>
                </div>
                <div className={styles.user_details}>
                    <div className={styles.details}>email</div>
                    <div className={styles.details}>regitered type</div>
                </div>
            </div>
            <div className={styles.meet_container}>
                <div className={styles.card_title}>Scheduled meetings:</div>
                {meeting ?(<Card/>):
                ( 
                <div className={styles.meeting_message}>no meetings scheduled</div>
                )}
            </div>
            <div className={styles.meet_container}>
                <div className={styles.card_title}>Children:</div>
                <ChildCard/>
            </div>
        </div>
    )
}