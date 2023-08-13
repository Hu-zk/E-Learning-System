import "./style.css"
import {BsThreeDotsVertical, BsFolder} from "react-icons/bs";
import {AiOutlineCalendar} from "react-icons/ai"

const Course = () => {
    return (
        <div className="class">
            <div className="top-class">
                <div class="class-title">
                    <p>Course One</p>
                    <BsThreeDotsVertical size={25}/>
                </div>
            </div>
            <div className="mid-class"></div>
            <div className="bottom-class">
                <div className="icon">
                    <AiOutlineCalendar size={25}/>
                </div>
                <div className="icon">
                    <BsFolder size={25}/>
                </div>
            </div>
        </div>
    );
}

export default Course