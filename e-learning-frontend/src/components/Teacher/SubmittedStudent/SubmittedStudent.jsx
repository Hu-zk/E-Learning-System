import "./style.css"

const SubmittedStudent = ({student, grade, setSolution}) => {

    const {name} = student.student

    return (
        <div onClick={e => setSolution(student)} className="student">
            <div className="left-student">
                <div className="profile">
                    <img
                        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=900&t=st=1691932082~exp=1691932682~hmac=f10869f2a6b989045fe787063f903e31785f016a5be93ef1194b14e23c31c296"
                        alt="profile picture"/>
                </div>
                <div className="name">{name}</div>
            </div>
            <div className="right-student">/{grade}</div>
        </div>
    );
}

export default SubmittedStudent