import "./style.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdGrade } from "react-icons/md";

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
        <div>
            {/* <div>Home</div> */}
        {/* <div> <Sidebar/> </div> */}
            <Sidebar sidebarContent={sidebar} />
        </div>
        
    )
}

export default Home