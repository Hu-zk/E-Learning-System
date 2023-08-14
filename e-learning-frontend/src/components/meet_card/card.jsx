import React from "react";
import styles from  './card.module.css';
import {BsCameraVideoFill} from "react-icons/bs";
import {GrFormClose} from "react-icons/gr";
// BsCameraVideoFill GrFormClose

export const Card = () =>{
    return(
        <div className={styles.container}>
            <div className={styles.card_body}>
                <div className={styles.name}>charbel daoud</div>
                <div className={styles.icon}>
                    <BsCameraVideoFill/>
                </div>
            </div>
            <div className={styles.close}>
                <div className={styles.clickable}>
                    <GrFormClose/>
                </div>
            </div>
        </div>
    )
}