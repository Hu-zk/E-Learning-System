import "./style.css"

const Grades = () => {
    return (
        <div className="grades">
            <div className="top-grades">
                <div className="left">
                    <button>100 points</button>
                </div>
                <div className="right">4 Turned in / 15 Assigned</div>
                <div className="bottom-grades">
                    <div className="left">
                        <div className="student">
                            <div className="left-student">
                                <div className="profile">
                                    <img src="" alt=""/>
                                </div>
                                <div className="name">Mohammad Hussein</div>
                            </div>
                            <div className="right-student">
                                /100
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <div className="name">Mhmd Hussein</div>
                            <div><input type="text" />/100</div>
                        </div>
                        <div className="give-feedback">Give Feedbak</div>
                        <div>
                            <textarea cols="20" rows="10"></textarea>
                            <div className="close">X</div>
                        </div>
                        <div className="submit-grade">Submit Grade</div>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Grades