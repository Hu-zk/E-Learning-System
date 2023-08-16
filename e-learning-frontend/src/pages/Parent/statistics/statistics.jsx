import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './statistics.module.css';
import { Assignment } from "../../../components/parent/assignment/assignmentComp";
import { SharedComp } from "../../../components/parent/multiUseComp/multiUseComp";

const Statistics = () => {
    const [isCompleted,setIsCompleted] = useState([]);
    const [messagebody, setMessage] = useState('');
    const [courses, setEnrolledCourses] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const completed = "Completed";
    const enrolled = "Enrolled";
    const attend = "Attandance";
    const title = "Assignments";


    const getCompleted = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/get_is_completed', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.data.data;
        if(data){
            // console.log("data.data",data.data);
            const course_names = data.map(course => 
                course.course.name);
            setIsCompleted(course_names);

            // for(const i=0;i<data.data.length;i++){
            //     console.log(data.data.name)
            // }
        }
        // else if(data.message === 'Not compeleted courses'){
        //     console.log("no completed courses.");
        // }
        else{
            console.log("user has no registered courses");
        }
    }

    const getAttendance = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/attendance_course', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.data;
        // console.log("data",data);
        // console.log("data.status",data.status)
        // console.log("data.data",data.data) 
        const course_names = data.data?.map(
          (course) => (
            setEnrolledCourses(course.course_name),
            setAttendance(course.attendance_status),
            console.log("attend", course.attendance_status)
          )
        );
        console.log("info",courses)
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
                            <Assignment title={title}/>
                        </div>
                        <div className={styles.right_container}>
                            <SharedComp title={completed} info={isCompleted}/>
                            <SharedComp title={enrolled} info={courses}/>
                            <SharedComp title={attend} info={attendance}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics;