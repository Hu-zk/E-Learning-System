import styles from './bookmeeting.module.css';
import axios from 'axios';
import { Accordion } from "../../../components/accordion/accordion";
import React, { useEffect, useState } from 'react';
import { Assignment } from '../../../components/assignment/assignmentComp';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles


const BookMeeting = () => {
    const [teachers, setTeachers] = useState([]);
    const [date, setDate] = useState(new Date());
    // const [isAvailable, setIsAvailable] = useState(false);
    const title = "Teacher";

    const getAnnouncments = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/teachers_courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        // console.log("data= response.data",data[0].teacher_id);
        if(data.status == 'success'){
            // console.log("data.data",data.data[0].teacher_id)
            // setTeachers(data);
            // console.log(teachers[0][0])

            // const course_teacher = data.data.map(item => 
            //     item.teacher_id);
            

            const course_teacher = data.data.map(item => ({
            teacher_id: item.teacher_id,
            teacher_name: item.teacher_name})
            // console.log("attend", item.attendance_status)
        );
        setTeachers(course_teacher)
            // setIsAvailable(true);            console.log(teachers)

        }else{
            // setIsAvailable(false);
            console.log("there are no teachers");
        }
    }

    useEffect(()=>{
        getAnnouncments();
    },[])

    const handleDateChange = (newDate) => {
    setDate(newDate);
    };

    return (
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Analytics</div>
                    <div className={styles.stats_container}>
                        <div className={styles.left_container}>
                            <div className={styles.teacher_container}>
                                <div className={styles.teacher_container_header}>{title}</div>
                                <div className={styles.teacher_list}>
                                    {teachers.map(teacher=>(
                                        <div key={teacher.teacher_id}  className={styles.teachers_container}>
                                            <div className={styles.name}>{teacher.teacher_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.right_container}>
                            <div className={styles.input}>
                                <div className={styles.input_title}>meet-link</div>
                                <input type="text" placeholder='enter meet url' />
                            </div>
                            <div className={styles.calendar}>
                                <Calendar onChange={handleDateChange} value={date} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default BookMeeting;