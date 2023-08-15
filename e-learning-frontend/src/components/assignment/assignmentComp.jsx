import React from "react";
import styles from './assignmentComp.module.css';
import { AssignmentCard } from "../AssignmentCard/assignmentCard";

export const Assignment = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.container_header}>Assignment</div>
            <div className={styles.container_stats}>missing</div>
            <div className={styles.Assignment_body}>
                <AssignmentCard/>
            </div>
        </div>
    )
}