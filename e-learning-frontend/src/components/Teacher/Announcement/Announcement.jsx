import "./style.css"
import { LiaPaperPlaneSolid } from "react-icons/lia";

const Announcement = () => {
    return (
        <form className="announcement">
            <div className="profile-pic">
                <img src="" alt=""/>
                <input type="text" placeholder="Announce something to your class"/>
                <div>
                    Send{" "}
                    <div className="icon">
                        <LiaPaperPlaneSolid size={30}/>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Announcement