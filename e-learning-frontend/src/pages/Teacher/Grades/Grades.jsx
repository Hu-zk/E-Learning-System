import {useState} from "react";
import "./style.css"
import {GrClose} from "react-icons/gr"

const Grades = () => {

    let [file,
        setFile] = useState(null)
    let [fileType,
        setFileType] = useState(null)
    let [isFeedbackOpened,
        setIsFeedbackOpened] = useState(false)

    // const handleFileInput = (e) => {     const fileType = e.target.files[0].type;
    //     setFile(URL.createObjectURL(e.target.files[0]))
    // fileType.startsWith("image/")         ? setFileType("image")         :
    // setFileType("pdf"); }

    return (
        <div className="grades">
            <div className="top-grades">
                <div className="left">
                    <div className="assignment-points">100 points</div>
                </div>
                <div className="right">4 Turned in / 15 Assigned</div>
            </div>
            <div className="bottom-grades">
                <div className="left">
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                    <div className="student">
                        <div className="left-student">
                            <div className="profile">
                                <img
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                                    alt="profile picture"/>
                            </div>
                            <div className="name">Mohammad Hussein</div>
                        </div>
                        <div className="right-student">/100</div>
                    </div>
                </div>
                <div className="right">
                    <div>
                        <div className="name">Mhmd Hussein</div>
                        <div className="grade-input">
                            <input type="text"/>
                            /100
                        </div>
                    </div>
                    <button className="give-feedback" onClick={(e) => setIsFeedbackOpened(true)}>
                        Give Feedbak
                    </button>
                    {isFeedbackOpened && (
                        <div className="feedback">
                            <textarea placeholder="Provide a feedback" cols="20" rows="10"></textarea>
                            <div className="close">
                                <GrClose size={20} onClick={(e) => setIsFeedbackOpened(false)}/>
                            </div>
                        </div>
                    )}
                    <div className="submit-grade">Submit Grade</div>
                    <img src="" alt=""/> {file && fileType === "image"
                        ? (<img src={file}/>)
                        : (<iframe src={file} alt=""/>)}
                </div>
            </div>
        </div>
    );
}

export default Grades;