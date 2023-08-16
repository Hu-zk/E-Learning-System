import styles from './bookmeeting.module.css';
import axios from 'axios';
import { Accordion } from "../../../components/parent/accordion/accordion";
import React, { useEffect, useState } from 'react';
import { Assignment } from '../../../components/parent/assignment/assignmentComp';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {MdOutlineAddBox} from "react-icons/md";


const BookMeeting = () => {
    const [teachers, setTeachers] = useState([]);
    const [url, setUrl] = useState('');
    const [teacherId, setTeacherId] = useState('');
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
        console.log("teachers",teachers)
            // setIsAvailable(true);            console.log(teachers)

        }else{
            // setIsAvailable(false);
            console.log("there are no teachers");
        }
    }

    const bookAMeeting = async () => {
        const body = {
            receiver_id: teacherId,
            link_url: url,
            date: date
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