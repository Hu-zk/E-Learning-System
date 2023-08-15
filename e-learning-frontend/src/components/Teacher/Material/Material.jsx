import "./style.css"
import {BsThreeDotsVertical} from "react-icons/bs"
import {CgNotes} from "react-icons/cg"
import {formatDistanceToNow, parseISO} from "date-fns";
import {Link, useNavigate, useParams} from "react-router-dom/dist/umd/react-router-dom.development";

const Material = ({data}) => {

    const {id} = useParams()
    const isMaterial = data.is_announcement === 0
    const isQuiz = data.is_quiz === 1
    const navigate = useNavigate()

    const dateObject = data.created_at
        ? parseISO(data.created_at)
        : null

    const handleNavigate = (e) => {
        console.log(isQuiz)
        if(isQuiz !== "undefined") {
            navigate(`/teacher/course/${id}/assignment/${data.id}`)
        }
    }

    return (
            <div onClick={handleNavigate} className="material">
                <div className="left-material">
                    <div className="icon">
                        <CgNotes size={25}/>
                    </div>
                    <div className="content">
                        <div className="title">
                            You posted a new {isMaterial && "material"}{" "} {isQuiz
                                ? "quiz"
                                : "assignment"}: {data.title}
                        </div>
                        {dateObject && (
                            <p>{formatDistanceToNow(dateObject, {addSuffix: true})}</p>
                        )}
                    </div>
                </div>
                <div className="right-material">
                    <BsThreeDotsVertical size={25}/>
                </div>
            </div>
    );
}

export default Material