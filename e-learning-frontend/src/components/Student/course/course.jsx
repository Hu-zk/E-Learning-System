import "./course.css";
import { BsThreeDotsVertical, BsFolder } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Course = ({ course }) => {
  let { name, capacity, enrollments_count, created_at } = course;
  const navigate = useNavigate();
  return (
    <div className="class">
      <div className="top-class">
        <div className="class-title">
          <p>{name}</p>
          <BsThreeDotsVertical size={25} />
        </div>
      </div>
      <div className="mid-class">
        <div>capacity :{capacity}</div>
        <div>{capacity - enrollments_count} seat available</div>
        <div>Launched in {created_at}</div>
      </div>
      <div className="bottom-class">
        <div className="icon">
          <AiOutlineCalendar size={25} />
        </div>
        <div className="icon">
          <BsFolder size={25} />
        </div>
      </div>
    </div>
  );
};

export default Course;
