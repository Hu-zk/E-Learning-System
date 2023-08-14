import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../components/userInfo/userInfo";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();
  const sidebar = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
        </svg>
      ),
      navigate: "Home Page",
      onclick: () => navigate("/student"),
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="M521-878q143 14 243.033 114.208Q864.065-663.584 878-521H594q-8-26-27.5-44T521-591v-287Zm60 76v174q14 9 27 20.5t21 26.5h173q-25-80-83-138.5T581-802Zm-142-76v287q-35 14-56.5 45.188Q361-514.624 361-477q0 36.081 21.5 65.04Q404-383 439-369.913V-82Q286-96 183.5-209T81-477q0-155 102-270.5T439-878Zm-60 76q-109 30-173.5 121T141-477q0 111 66 199.5T379-157v-174q-37-25-57.5-63T301-477q0-45 20-85t58-66v-174Zm215 363h284q-14 143-114.208 243.033Q663.584-95.935 521-82v-288q26-8 45.5-25.5T594-439Zm35.167 60Q619-365 607.5-352 596-339 581-331v173q80-23 138-82t83-139H629.167ZM301-479Zm328-102Zm0 202Z" />
        </svg>
      ),
      navigate: "InProcess",
      onclick: () => navigate("/student/InProcess"),
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm27-79 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Zm-43 133 227-225-45-41-182 180-95-99-46 45 141 140Z" />
        </svg>
      ),
      navigate: "Completed",
      onclick: () => navigate("/student/Completed"),
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
        </svg>
      ),
      navigate: "Logout",
      onclick: () => navigate("/logout"),
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48">
          <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
        </svg>
      ),
      navigate: "Logout",
      onclick: () => navigate("/logout"),
    },
  ];
  return (
    <div className="landing-page">
      <Sidebar sidebarContent={sidebar} />
      <UserInfo />
    </div>
  );
}

export default Landing;
