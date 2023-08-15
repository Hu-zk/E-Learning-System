import React from "react";
import styles from './multiUseComp.module.css';

export const SharedComp = ({title,info}) =>{
    // const datas = info.name;
    // console.log(datas);
    return(
        <div className={styles.container}>
            <div className={styles.header}>{title}</div>
            <div className={styles.details}>{info}</div>
            {/* {items.map((item, index) => (
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
            ))} */}
        </div>
    )
}