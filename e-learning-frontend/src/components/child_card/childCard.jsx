import React from "react";
import styles from './childCard.module.css';

export const ChildCard = ({child}) =>{
    return(
        <div className={styles.container}>
            <div className={styles.container_header}>
                <div className={styles.header_left}>
                    <div>{child.name}</div>
                    <div>{child.email}</div>
                </div>
                <div className={styles.header_right}>
                    <img src="/image.jpg" alt="child image"/>
                </div>
            </div>
            {/* <div className={styles.container_body}>
                <div className={styles.card_title}>courses:</div>
            </div> */}
        </div>
    )
}