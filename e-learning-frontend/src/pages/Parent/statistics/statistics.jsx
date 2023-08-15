import React from "react";
import styles from './statistics.module.css';

const Statistics = () => {
    return(
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Analytics</div>
                    <div className={styles.stats_container}>
                        <div className={styles.left_container}></div>
                        <div className={styles.right_container}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics;