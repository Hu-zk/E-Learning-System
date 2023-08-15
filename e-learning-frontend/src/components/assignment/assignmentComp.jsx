import React, {useState,useEffect} from "react";
import axios from 'axios';
import styles from './assignmentComp.module.css';
import { AssignmentCard } from "../AssignmentCard/assignmentCard";

export const Assignment = () =>{
    const [assignments, setAssignments] = useState([]);
    // const [isAvailable, setIsAvailable] = useState(false);

    const getAssignments = async () => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user/parent/get_is_submited', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log("dataaaaa",data);
        if(data.status == 'success'){
            setAssignments(data.data);
            // setIsAvailable(true);
        }else{
            // setIsAvailable(false);
            console.log("there are no assignments");
        }
    }

    useEffect(()=>{
        getAssignments();
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.container_header}>Assignments</div>
            {/* <div className={styles.container_stats}>Submitted</div> */}
            <div className={styles.Assignment_body}>
                {assignments.map(assignment=>(
                <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                />
                ))}
            </div>
        </div>
    )
}