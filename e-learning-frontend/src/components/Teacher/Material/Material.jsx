import "./style.css"
import {BsThreeDotsVertical} from "react-icons/bs"
import {CgNotes} from "react-icons/cg"
import {formatDistanceToNow, parseISO} from "date-fns";
import {Link, useNavigate, useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import Announcement from "../Announcement/Announcement";
import React, { useState } from "react";
import { MdQuiz } from "react-icons/md"
import { BiBookBookmark } from "react-icons/bi"

const Material = ({data}) => {

    const {id} = useParams()
    const navigate = useNavigate()

    const dateObject = data.created_at
        ? parseISO(data.created_at)
        : null

    const handleNavigate = (e) => {
        if(data.is_quiz !== undefined) {
            navigate(`/teacher/course/${id}/assignment/${data.id}`)
        }
    }

    let type = ""
    let icon = null;
    if(data.is_announcement !== undefined && data.is_announcement) {
        type = "announcement"
    }else if(data.is_announcement !== undefined && !data.is_announcement) {
        type = "material"
        icon = <BiBookBookmark size={25} />
    }else if(data.is_quiz !== undefined && data.is_quiz) {
        type = "quiz"
        icon = <MdQuiz size={25} />
    }else if(data.is_quiz !== undefined && !data.is_quiz) {
        type = "assignment"
        icon = <CgNotes size={25} />
    }

    return (
        <React.Fragment>
            {data.is_announcement ? <Announcement data={data} /> : <div onClick={handleNavigate} className="material">
                <div className="left-material">
                    <div className="icon">
                        {icon}
                    </div>
                    <div className="content">
                        <div className="title">
                            You posted a new {type}: {data.title}
                        </div>
                        {dateObject && (
                            <p>{formatDistanceToNow(dateObject, {addSuffix: true})}</p>
                        )}
                    </div>
                </div>
                <div className="right-material">
                    <BsThreeDotsVertical size={25} />
                </div>
            </div>}
        </React.Fragment>
            
    );
}

export default Material