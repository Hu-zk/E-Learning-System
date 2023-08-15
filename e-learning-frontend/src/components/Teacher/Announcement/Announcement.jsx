import "./style.css"
import { BsThreeDotsVertical } from "react-icons/bs"

const Announcement = () => {
    return (
        <div className="annoucement">
            <div className="annoucement-top">
                <div className="left">
                    <div className="img">
                        <img
                            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                            alt=""/>
                    </div>
                    <div>
                        <div className="name">Mhmd Hussein</div>
                        <div className="date">Jul 23</div>
                    </div>
                </div>
                <div className="right"><BsThreeDotsVertical size={25} /></div>
            </div>
            <div className="announcement-bottom">
                <div className="title">announcementttt</div>
                <p>Description</p>
            </div>
        </div>
    );
}

export default Announcement