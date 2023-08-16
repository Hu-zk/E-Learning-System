import React, { useEffect, useState } from "react";
import styles from './assignmentCard.module.css';
import {GrFormClose} from "react-icons/gr";
import {AiOutlineCheck} from "react-icons/ai";



export const AssignmentCard = ({assignment}) =>{
    const [flag, setFlag] = useState(false)
    const checkGrade=()=>{
        if(assignment.submission_data.grade>50){
        setFlag(true);
        }
        console.log('hello', assignment)
    }

    useEffect(()=>{
        checkGrade();
    },[])
    
    return(
        <div className={styles.container}>
            <div className={styles.name}>{assignment.course_name} <span>{assignment.submission_data.grade}</span>  </div>
            {flag ? (<AiOutlineCheck size={20}/>):(<GrFormClose size={20}/>
            )}
        </div>
    )
}