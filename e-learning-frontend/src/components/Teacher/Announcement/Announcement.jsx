import "./style.css"
import {LiaPaperPlaneSolid} from "react-icons/lia";

const Announcement = () => {
    return (
        <form className="announcement">
            <div className="profile-pic">
                <img
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                    alt=""/>
            </div>
            <input type="text" placeholder="Announce something to your class"/>
            <div className="send">
                Send{" "}
                <LiaPaperPlaneSolid size={30}/>
            </div>
        </form>
    );
}

export default Announcement