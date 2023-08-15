import styles from './bookmeeting.module.css';
import axios from 'axios';
import { Accordion } from "../../../components/accordion/accordion";
import React, { useEffect, useState } from 'react';
import { Assignment } from '../../../components/assignment/assignmentComp';

const BookMeeting = () => {
    // const [announcement, setAnnouncment] = useState([]);
    // const [isAvailable, setIsAvailable] = useState(false);
    const title = "Teacher";

    // const getAnnouncments = async () => {
    //     const token = localStorage.getItem('jwtToken');
    //     const response = await axios.get('http://127.0.0.1:8000/api/user/parent/teacher_announcement', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     const data = response.data;
    //     console.log("dataaaaa",data);
    //     if(data.status == 'success'){
    //         setAnnouncment(data.data);
    //         setIsAvailable(true);
    //     }else{
    //         setIsAvailable(false);
    //         console.log("there are no announcments");
    //     }
    // }

    // useEffect(()=>{
    //     getAnnouncments();
    // },[])

    return (
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Analytics</div>
                    <div className={styles.stats_container}>
                        <div className={styles.left_container}>
                            <Assignment title={title}/>
                        </div>
                        <div className={styles.right_container}>
                            {/* <SharedComp title={completed} info={isCompleted}/> */}
                            {/* <SharedComp title={enrolled} info={courses}/>
                            <SharedComp title={attend} info={attendance}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default BookMeeting;