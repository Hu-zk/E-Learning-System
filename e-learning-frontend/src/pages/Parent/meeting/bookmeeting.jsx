import styles from './bookmeeting.module.css';
import axios from 'axios';
import { Accordion } from "../../../components/parent/accordion/accordion";
import React, { useEffect, useState } from 'react';
import { Assignment } from '../../../components/parent/assignment/assignmentComp';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {MdOutlineAddBox} from "react-icons/md";
// import { format } from 'date-fns';

const BookMeeting = () => {
    const [teachers, setTeachers] = useState([]);
    const [url, setUrl] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [date, setDate] = useState(new Date());
    const title = "Teacher";

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const mysqlFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    console.log(teacherId, url, date);

    const getAnnouncments = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/teachers_courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        if(data.status == 'success'){
            
         const course_teacher = data.data
            .filter(item => item.teacher_id && item.teacher_name) 
            .map(item => ({
                teacher_id: item.teacher_id,
                teacher_name: item.teacher_name
            }));
        setTeachers(course_teacher)
        console.log("course_teacher",course_teacher)

        }else{
            console.log("there are no teachers");
        }
    }

    const bookAMeeting = async () => {
        const body = {
            receiver_id: teacherId,
            link_url: url,
            date: mysqlFormattedDate
        }
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post('http://127.0.0.1:8000/api/user/shared/send_meet',body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
    }

    const inputChange = (event) => {
    setUrl(event.target.value);
    };

    const getTeacherID = (id) =>{
        setTeacherId(id)
    }

    console.log("my teacherId" , teacherId)

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
                    <div className={styles.page_header}>Book a meeting
                        <div className={styles.button_add}>
                            <MdOutlineAddBox size={30} onClick={()=>bookAMeeting()}/>
                        </div>
                    </div>
                    <div className={styles.stats_container}>
                        <div className={styles.left_container}>
                            <div className={styles.teacher_container}>
                                <div className={styles.teacher_container_header}>{title}</div>
                                <div className={styles.teacher_list}>
                                    {teachers.map(teacher=>(
                                        <div key={teacher.teacher_id}  className={styles.teachers_container} onClick={()=>getTeacherID(teacher.teacher_id)}>
                                            <div className={styles.name}>{teacher.teacher_name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.right_container}>
                            <div className={styles.input}>
                                <div className={styles.input_title}>meet-link</div>
                                <input type="text" placeholder='enter meet url' value={url} onChange={inputChange}/>
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