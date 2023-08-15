import React, { useEffect, useState } from "react";
import styles from './profile.module.css';
import { Card } from "../meet_card/card";
import axios from 'axios';
import { ChildCard } from "../child_card/childCard";

export const Profile = () =>{
    const [meeting, setMeeting] = useState(false);
      const [children, setChildren] = useState([]);

    const user_data = localStorage.getItem('userData');
    const user_info  = JSON.parse(user_data);

    // if(user_info.user_type_id == 3){
    //     setType("parent");
    // }

    const getMeeting = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/get_parent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        if(data.message == 'No meeting'){
            setMeeting(false);
        }else{
            setMeeting(true);
        }
    }

        const getChild = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/get_child', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        if(data.status == 'success'){
            setChildren(data.data);
            console.log('children', children)
        }else{
            console.log("no children exist")
        }
    }

    useEffect(()=>{
        getMeeting();
        getChild();
    },[])

    return(
        <div className={styles.contaier}>
            <div className={styles.container_header}>
                <div className={styles.header}>
                    <div className={styles.image_container}>
                        <img src="/image.jpg" alt="user profile image"/>
                    </div>
                    <div className={styles.user_name}>{user_info.name}</div>
                </div>
                <div className={styles.user_details}>
                    <div className={styles.details}>{user_info.email}</div>
                    {/* <div className={styles.details}>user type: {type}</div> */}
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
                {children.map(child=>(
                <ChildCard
                key={child.id}
                child={child}
                />
                ))}
            </div>
        </div>
    )
}