import React from "react";
import styles from './assignmentCard.module.css';
import {GrFormClose} from "react-icons/gr";


export const AssignmentCard = () =>{
    return(
        <div className={styles.container}>
            <div className={styles.name}>name</div>
            <GrFormClose size={20} />
        </div>
    )
}