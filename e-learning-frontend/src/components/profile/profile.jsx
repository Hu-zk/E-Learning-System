import React, { useEffect, useState } from "react";
import styles from './profile.module.css';
import { Card } from "../parent/meet_card/card";
import axios from 'axios';
import { ChildCard } from "../parent/child_card/childCard";

export const Profile = () =>{
    const [meeting, setMeeting] = useState(false);
    const [availableMeets, setAvailableMeets] = useState([]);
    const [children, setChildren] = useState([]);

    const user_data = localStorage.getItem('userData');
    const user_info  = JSON.parse(user_data);

    const getMeeting = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/shared/get_parent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        if(data.message === 'No meeting'){
            setMeeting(false);
        }else{
            setMeeting(true);
            // console.log("meetings",data.send)
            const parent_meet = data.send.map(item => ({
            id: item.id,
            link_url: item.link_url,
            name: item.receiver_meet.name})
            // console.log("attend", item.attendance_status)
        );
        setAvailableMeets(parent_meet);
        // console.log("availble",availableMeets)
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
        if(data.status === 'success'){
            setChildren(data.data);
            // console.log('children', children)
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
                        <img src="/image.jpg" alt="user profile image1"/>
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
                <div className={styles.scrollable_cont}>
                    {meeting ?(
                    availableMeets.map(item => (
                        <Card name={item.name} link={item.link_url} id={item.id}/>
                    ))
                    ):
                    ( 
                    <div className={styles.meeting_message}>no meetings scheduled</div>
                    )}
                </div>
            </div>
            <div className={styles.child_container}>
                <div className={styles.card_title}>Children:</div>
                <div className={styles.chilren_container}>
                    {children.map(child=>(
                        <ChildCard
                        key={child.id}
                        child={child}
                        />
                        ))}
                </div>
            </div>
        </div>
    )
}