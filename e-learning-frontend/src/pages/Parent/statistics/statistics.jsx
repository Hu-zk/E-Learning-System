import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './statistics.module.css';
import { Assignment } from "../../../components/assignment/assignmentComp";
import { SharedComp } from "../../../components/multiUseComp/multiUseComp";

const Statistics = () => {
    const [notCompleted,setNotCompleted] = useState(false);
    const [messagebody, setMessage] = useState('');
    const [info, setInfo] = useState([]);
    const completed = "completed";
    const enrolled = "enrolled";


    const getCompleted = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/get_is_completed', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        if(data.message == 'success'){
            if(data.data){
                console.log("enrolled classes are...", data.data);
            }
        }else{
            console.log("no enrolled courses.")
        }
    }

        const getAttendance = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/attendance_course', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log("majed",data);
        if(data.status == 'success'){
            // console.log(data.data)

            setInfo(data.data);
        }else{
            console.log("no attendance")
        }
    }

    useEffect(()=>{
        getCompleted();
        getAttendance();
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Analytics</div>
                    <div className={styles.stats_container}>
                        <div className={styles.left_container}>
                            <Assignment/>
                        </div>
                        <div className={styles.right_container}>
                            <SharedComp title={completed} info={messagebody}/>
                            <SharedComp title={enrolled} info={info}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics;