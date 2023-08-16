import React from "react";
import styles from './multiUseComp.module.css';

export const SharedComp = ({title,info}) =>{

    return(
        <div className={styles.container}>
            <div className={styles.header}>{title}</div>
            <div className={styles.details}>{info}</div>
        </div>
    )
}