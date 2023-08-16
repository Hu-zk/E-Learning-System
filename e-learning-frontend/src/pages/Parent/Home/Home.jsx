import styles from './style.module.css';
import axios from 'axios';
import { Accordion } from "../../../components/parent/accordion/accordion";
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [announcement, setAnnouncment] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);

    const getAnnouncments = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/teacher_announcement', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log("dataaaaa",data);
        if(data.status == 'success'){
            setAnnouncment(data.data);
            setIsAvailable(true);
        }else{
            setIsAvailable(false);
            console.log("there are no announcments");
        }
    }

    useEffect(()=>{
        getAnnouncments();
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Announcements</div>
                    <div className={styles.announcements_container}>
                        {isAvailable ? ( <Accordion items={announcement}/>): (<div>no announcements</div>)}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;