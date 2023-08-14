import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input/input";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [data, setdata] = useState([]);
  const handleDataChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = async () => {
    try {
      await login(data);
        navigate("/parent/Home");
    } catch (err) {
      console.log(err);
      //   setError(true);
      //   setErrorContent(err.response.data.message);
    }
  };
  return (
    <div className=" signin-container">
      {/* <img src="/images.png" alt="" className="logo" /> */}
      <div className="inputs">
        <Input
          onchange={handleDataChange}
          label={"Mobile Number or Email"}
          name={"email"}
          type={"email"}
        />
        <Input
          onchange={handleDataChange}
          label={"Password"}
          name={"password"}
          type={"password"}
        />
      </div>
      <button className="button" onClick={handlesubmit}>
        login in
      </button>
      {error ? (
        <div className="error">{errorContent}</div>
      ) : (
        <div className="or"></div>
      )}
      {/* <div className=" facebook">Log in with facebook</div> */}
      {/* <a href="#">Forgot passsword ?</a> */}
      {/* <div className="have-account"> */}
      {/* Don't have an account? <a href="/register"> Sign up</a> */}
      {/* </div> */}
    </div>
  );
}

export default Login;
