import Sidebar from "../../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdGrade } from "react-icons/md";
import { Profile } from "../../../components/profile/profile";
import styles from './style.module.css';

const Home = () => {
    const navigate = useNavigate();
    const sidebar = [
        {
        svg: <AiFillHome size={32} />,
        onclick: () => navigate("/student"),
        },
        {
        svg: <BsFillChatLeftTextFill size={32} />,
        onclick: () => navigate("/student/InProcess"),
        },
        {
        svg: <MdGrade size={32} />,
        onclick: () => navigate("/student/Completed"),
        },
    ];

    return (
        <div className={styles.container}>
            <div>
                <Sidebar sidebarContent={sidebar}/>
            </div>
            <div className={styles.page_body}>
                <div className={styles.body_left}>left</div>
                <div className={styles.body_right}>
                    <Profile/>
                </div>
            </div>
        </div>
        
    )
}

export default Home;