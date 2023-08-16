import "./style.css"
import {BsThreeDotsVertical, BsFolder} from "react-icons/bs";
import {AiOutlineCalendar} from "react-icons/ai"
import {Link} from "react-router-dom/dist/umd/react-router-dom.development";

const Course = ({name, id}) => {
    return (
        <Link to={`/teacher/course/${id}`}>
            <div className="class">
                <div className="top-class">
                    <div className="class-title">
                        <p>{name}</p>
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
        </Link>
    );
}

export default Course