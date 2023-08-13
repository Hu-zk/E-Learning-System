import "./style.css"
import {BsThreeDotsVertical} from "react-icons/bs"
import {CgNotes} from "react-icons/cg"

const Material = () => {
    return (
        <div className="material">
            <div className="left-material">
                <div className="icon">
                    <CgNotes size={25}/>
                </div>
                <div className="content">
                    <div className="title">
                        Mhmd Hussein posted a new assignemnt: from here
                    </div>
                    <p>Jul 26</p>
                </div>
            </div>
            <div className="right-material">
                <BsThreeDotsVertical size={25}/>
            </div>
        </div>
    );
}

export default Material