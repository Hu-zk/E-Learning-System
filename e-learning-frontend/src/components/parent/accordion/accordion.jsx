import React, { useState } from 'react';
import styles from './accordion.module.css';
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
// MdOutlineKeyboardArrowDown

export const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };
    return (
        <div className={styles.container}>
            {items.map((item, index) => (
                <div key={item.id}>
                <button onClick={() =>handleClick(index)} className={styles.accordian_container}>
                    {item.teacher_name}
                    <MdOutlineKeyboardArrowDown/>
                </button>
                {index === activeIndex && 
                <div className={styles.accordion_body}>
                    <p>{item.material_content}</p>
                </div>}
                </div>
            ))}
        </div>
    )
}