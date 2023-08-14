import React, {useState, useRef, useEffect} from "react";
import Announcement from "../../../components/Teacher/Announcement/Announcement";
import Material from "../../../components/Teacher/Material/Material";
import "./style.css"
import "react-dropdown/style.css";
import {GrClose} from "react-icons/gr"
import {Link, useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios"

const Course = () => {

    const {id} = useParams()

    let [title,
        setTitle] = useState("")
    let [description,
        setDescription] = useState("")
    let [date,
        setDate] = useState("")
    let [grade,
        setGrade] = useState("")
    let [file,
        setFile] = useState("")
    let [isModalOpened,
        setIsModalOpened] = useState(false)
    const boxModalRef = useRef(null)
    let [materialType,
        setMaterialType] = useState("")

    let [isAnnouncementOpened,
        setIsAnnouncementOpened] = useState(false)
    const [open,
        setOpen] = useState(false);
    const fileRef = useRef(null)

    const uploadAssignmentQuiz = async(type) => {
        let data = {
            title,
            description,
            grade,
            deadline: date,
            course_id: id,
            file,
            is_quiz: type === "quiz"
                ? true
                : false
        }
        console.log(data)
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/user/teacher/${id}/create-assignment-quiz`, data, {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                            "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDQxMDEwLCJleHAiOjE2OTIwNDQ2MTAsIm5iZiI6" +
                            "MTY5MjA0MTAxMCwianRpIjoiUzc2dEpISjVLbVBTUDNpOCIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                            "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Lfu1lilaozWX07rux7qGAhATUcOrLcTx" +
                            "JLpFtXKqu_E"
                }
            });
            console.log(response)
            setTitle("")
            setDescription("")
            setDate("")
            setGrade("")
            setFile(null)
            setIsModalOpened(false)
        } catch (error) {
            console.log(error)
        }

    }

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleOpenAnnouncement = () => {
        setIsAnnouncementOpened(true)
    }

    const openModal = () => {
        setOpen(false);
        setIsModalOpened(true)
    }

    const handleMenuOne = () => {
        openModal()
    };

    const handleMenuTwo = () => {
        openModal()
        setMaterialType("quiz")
    };

    const handleMenuThree = () => {
        openModal()
        setMaterialType("assignment")
    };

    const handleGradeChange = (e) => {
        if (!isNaN(e.target.value)) {
            setGrade(e.target.value)
        }
    }

    const handleModalClick = (e) => {
        if (e.target !== boxModalRef.current && !boxModalRef.current.contains(e.target)) {
            setIsModalOpened(false)
        }
    }

    useEffect(() => {
        const getCourseDetails = async() => {
            let response = await axios.get(`http://127.0.0.1:8000/api/user/shared/${id}/content`, {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                            "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDQxMDEwLCJleHAiOjE2OTIwNDQ2MTAsIm5iZiI6" +
                            "MTY5MjA0MTAxMCwianRpIjoiUzc2dEpISjVLbVBTUDNpOCIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                            "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Lfu1lilaozWX07rux7qGAhATUcOrLcTx" +
                            "JLpFtXKqu_E"
                }
            });
            console.log(response.data.content)
        }
        getCourseDetails()
    }, [])

    return (
        <div className="teacher-course-page">
            {isModalOpened && (
                <div className="modal" onClick={handleModalClick}>
                    <div className="box" ref={boxModalRef}>
                        <div className="close" onClick={(e) => setIsModalOpened(false)}>
                            <GrClose size={25} className="icon"/>
                        </div>
                        <div>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Title"/>
                        </div>
                        <div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                cols="30"
                                rows="10"></textarea>
                        </div>
                        <div className="row">
                            <div>
                                <input
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    type="date"
                                    placeholder="Deadline"/>
                            </div>
                            <div>
                                <input
                                    value={grade}
                                    onChange={(e) => handleGradeChange(e)}
                                    type="text"
                                    placeholder="Grade"/>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => fileRef.current.click()} className="upload-file">
                                Upload File
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={(e) => materialType === "quiz"
                                ? uploadAssignmentQuiz("quiz")
                                : uploadAssignmentQuiz("assignment")}
                                className="assign">
                                Assign
                            </button>
                        </div>
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            ref={fileRef}
                            style={{
                            display: "none"
                        }}
                            className="fileInput"
                            type="file"/>
                    </div>
                </div>
            )}
            <div className="buttons">
                <div>
                    <button onClick={handleOpenAnnouncement}>Announce</button>
                </div>
                <div>
                    <Dropdown
                        className="dropdown"
                        open={open}
                        trigger={<button onClick = {
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
                        <Link to={`/teacher/course/${id}/attendance`}>
                            <button>Manage Attendance</button>
                        </Link>
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
