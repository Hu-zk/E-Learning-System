import React from "react";
import styles from './profile.module.css';
import { Card } from "../meet_card/card";
import { ChildCard } from "../child_card/childCard";

export const Profile = () =>{
    return(
        <div className={styles.contaier}>
            <div className={styles.container_header}>
                <div className={styles.header}>
                    <div className={styles.image_container}>
                        <img src="/image.jpg" alt="user profile image"/>
                    </div>
                    <div className={styles.user_name}>name</div>
                </div>
                <div className={styles.user_details}>
                    <div className={styles.details}>email</div>
                    <div className={styles.details}>regitered type</div>
                </div>
            </div>
            <div className={styles.meet_container}>
                <div className={styles.card_title}>Scheduled meetings:</div>
                <Card/>
            </div>
            <div className={styles.meet_container}>
                <div className={styles.card_title}>Children:</div>
                <ChildCard/>
            </div>
        </div>
    )
}