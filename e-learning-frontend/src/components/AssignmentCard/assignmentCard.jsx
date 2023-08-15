import React from "react";
import styles from './assignmentCard.module.css';
import {GrFormClose} from "react-icons/gr";


export const AssignmentCard = ({assignment}) =>{
    return(
        <div className={styles.container}>
            <div className={styles.name}>Got an: {assignment.grade}</div>
            <GrFormClose size={20} />
        </div>
    )
}