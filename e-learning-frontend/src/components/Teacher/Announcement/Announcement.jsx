import {useState} from "react";
import "./style.css"
import {LiaPaperPlaneSolid} from "react-icons/lia";
import {useParams} from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";

const Announcement = () => {

    const {id} = useParams()
    let [title,
        setTitle] = useState("")
    let [desc,
        setDesc] = useState("")

    const handleAnnounce = async() => {
        let data = {
            title,
            description: desc,
            is_announcement: true,
            course_id: id
        }
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/user/teacher/${id}/create-material`, data, {
                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgw" +
                            "MDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkyMDQxMDEwLCJleHAiOjE2OTIwNDQ2MTAsIm5iZiI6" +
                            "MTY5MjA0MTAxMCwianRpIjoiUzc2dEpISjVLbVBTUDNpOCIsInN1YiI6IjYiLCJwcnYiOiIyM2JkNWM4" +
                            "OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Lfu1lilaozWX07rux7qGAhATUcOrLcTx" +
                            "JLpFtXKqu_E"
                }
            });
            setTitle("")
            setDesc("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="announcement">
            <div className="top-announcement">
                <div className="profile-pic">
                    <img
                        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                        alt=""/>
                </div>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Announce something to your class"/>
                <div className="send" onClick={handleAnnounce}>
                    Send
                    <LiaPaperPlaneSolid size={30}/>
                </div>
            </div>
            <div className="bottom-announcement">
                <textarea
                    placeholder="Description"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    cols="30"
                    rows="10"></textarea>
            </div>
        </form>
    );
}

export default Announcement