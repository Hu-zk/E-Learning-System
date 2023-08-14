import React, {useState, useRef} from "react";
import Announcement from "../../../components/Teacher/Announcement/Announcement";
import Material from "../../../components/Teacher/Material/Material";
import "./style.css"
import "react-dropdown/style.css";
import {GrClose} from "react-icons/gr"

const Course = () => {

    let [title,
        setTitle] = useState("")
    let [content,
        setContent] = useState("")
    let [date,
        setDate] = useState("")
    let [grade,
        setGrade] = useState('')
    let [file,
        setFile] = useState('')
    let [isModalOpened, setIsModalOpened] = useState(false)

    let [isAnnouncementOpened,
        setIsAnnouncementOpened] = useState(false)
    const [open,
        setOpen] = React.useState(false);
    const fileRef = useRef(null)

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleOpenAnnouncement = () => {
        setIsAnnouncementOpened(true)
    }

    const handleMenuOne = () => {
        setOpen(false);
    };

    const handleMenuTwo = () => {
        setOpen(false);
    };

    const handleMenuThree = () => {
        setOpen(false);
    };

    const handleGradeChange = (e) => {
        if (!isNaN(e.target.value)) {
            setGrade(e.target.value)
        }
    }

    return (
        <div className="teacher-course-page">
            <div className="modal">
                <div className="box">
                    <div className="close"><GrClose size={30} className="icon"/></div>
                    <div><input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"/></div>
                    <div>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Content"
                            cols="30"
                            rows="10"></textarea>
                    </div>
                    <div className="row">
                        <div><input
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            type="date"
                            placeholder="Deadline"/></div>
                        <div><input
                            value={grade}
                            onChange={e => handleGradeChange(e)}
                            type="text"
                            placeholder="Grade"/></div>
                    </div>
                    <div>
                        <button onClick={() => fileRef.current.click()} className="upload-file">Upload File</button>
                    </div>
                    <input
                        onChange={e => setFile(e.target.files[0])}
                        ref={fileRef}
                        style={{
                        'display': "none"
                    }}
                        className="fileInput"
                        type="file"/>
                </div>
            </div>
            <div className="buttons">
                <div>
                    <button onClick={handleOpenAnnouncement}>Announce</button>
                </div>
                <div>
                    <Dropdown
                        className="dropdown"
                        open={open}
                        trigger={< button onClick = {
                        handleOpen
                    } > Upload Material </button>}
                        menu={[ < button onClick = {
                            handleMenuOne
                        } > Lecture </button>, <button onClick={handleMenuTwo}>Quiz</button >, < button onClick = {
                            handleMenuThree
                        } > Assignment </button>, ]}/>
                </div>
            </div>
            <div className="course-name">Course One</div>
            <div className="stream">
                <div className="left-stream">
                    {isAnnouncementOpened && <Announcement/>}
                    <div className="content">
                        <Material/>
                        <Material/>
                        <Material/>
                        <Material/>
                    </div>
                </div>
                <div className="right-stream">
                    <div className="attendance">
                        <h4>Attendance</h4>
                        <button>Manage Attendance</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

let Dropdown = ({open, trigger, menu}) => {
    return (
        <div className="dropdown">
            {trigger}
            {open
                ? (
                    <ul className="menu">
                        {menu.map((menuItem, index) => (
                            <li key={index} className="menu-item">
                                {menuItem}
                            </li>
                        ))}
                    </ul>
                )
                : null}
        </div>
    );
};

export default Course
