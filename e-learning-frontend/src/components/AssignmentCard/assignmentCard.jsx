import React, { useEffect, useState } from "react";
import styles from './assignmentCard.module.css';
import {GrFormClose} from "react-icons/gr";
import {AiOutlineCheck} from "react-icons/ai";



export const AssignmentCard = ({assignment}) =>{
    const [flag, setFlag] = useState(false)
    const checkGrade=()=>{
        if(assignment.grade>50){
        setFlag(true);
        }
    }

    useEffect(()=>{
        checkGrade();
    })
    
    return(
        <div className={styles.container}>
            <div className={styles.name}>Got an: {assignment.grade}</div>
            {flag ? (<AiOutlineCheck size={20}/>):(<GrFormClose size={20}/>
            )}
        </div>
    )
}