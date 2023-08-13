import "./style.css"
import {BiDotsHorizontalRounded} from "react-icons/bi"

const Course = () => {
    return (
        <div className="class">
            <div className="top-class">
                <div className="class-title">Course One</div>
                <div>
                    <BiDotsHorizontalRounded/>
                </div>
                <div className="profile-pic">
                    <img
                        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1689959898~exp=1689960498~hmac=24710ce7cf04054980189577c5643d038fc23a6b647b45454607e905f111cffb"
                        alt="Course Picture"/>
                </div>
            </div>
        </div>
    );
}

export default Course